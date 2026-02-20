import { readdir, readFile, stat } from "fs/promises";
import { resolve, join, dirname } from "path";
import YAML from "yaml";
import type { ServiceInfo } from "../types.d.ts";
import { ServiceState } from "../constants.js";
import dedent from "dedent";

async function getFiles(dir: string): Promise<string[]> {
  const subdirs = await readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    }),
  );
  return files.reduce<string[]>((acc, item) => acc.concat(item), []);
}

export async function fetchLocalCharts(): Promise<ServiceInfo[]> {
  // Try to find charts in current dir, then one level up (monorepo structure)
  let rootDir = join(process.cwd(), "charts");
  try {
    await stat(rootDir);
  } catch {
    rootDir = join(process.cwd(), "../../charts");
  }

  const files = await getFiles(rootDir);
  const helmfiles = files.filter((f) => f.endsWith("helmfile.yaml"));

  return await Promise.all<ServiceInfo>(
    helmfiles.map(async (hf) => {
      const content = await readFile(hf, "utf-8");
      const parsed = YAML.parse(content);
      const release = parsed.releases?.[0];
      const name = release?.name || "unknown";
      const path = dirname(hf);
      const relativePath = path.split("/charts/")[1];
      const [category] = relativePath.split("/");

      let localAppVersion = "unknown";
      try {
        const valuesContent = await readFile(join(path, "values.yaml"), "utf-8");
        const values = YAML.parse(valuesContent);
        localAppVersion =
          values?.controllers?.main?.containers?.main?.image?.tag ||
          values?.image?.tag ||
          "unknown";
      } catch {
        // Ignore if values.yaml doesn't exist
      }

      let readme = "";
      try {
        readme = await readFile(join(path, "README.md"), "utf-8");
      } catch {
        // Ignore if README.md doesn't exist
      }

      return {
        id: name,
        name,
        category,
        path,
        localChartVersion: release?.version || "unknown",
        localAppVersion: String(localAppVersion),
        state: ServiceState.NotInstalled,
        readme: dedent(readme),
      };
    }),
  );
}
