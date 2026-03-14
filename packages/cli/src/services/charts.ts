import { readdir, readFile, stat } from "fs/promises";
import { resolve, join, dirname } from "path";
import YAML from "yaml";
import type { ServiceInfo } from "../types";
import dedent from "dedent";
import { ArgoSyncStatus } from "../constants";

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

async function findChartsDir(): Promise<string> {
  const local = join(process.cwd(), "charts");
  try {
    await stat(local);
    return local;
  } catch {
    return join(process.cwd(), "../../charts");
  }
}

async function buildServiceInfo(appYaml: string): Promise<ServiceInfo> {
  const content = await readFile(appYaml, "utf-8");
  const parsed = YAML.parse(content);
  const name = parsed.metadata?.name || "unknown";
  const path = dirname(appYaml);
  const category =
    parsed.metadata?.labels?.category || path.split("/charts/")[1]?.split("/")[0] || "unknown";
  const namespace = parsed.spec?.destination?.namespace || "default";

  let readme = "";
  try {
    readme = await readFile(join(path, "README.md"), "utf-8");
  } catch {
    // Ignore if README.md doesn't exist
  }

  return {
    id: name,
    namespace,
    name,
    category,
    path,
    syncStatus: ArgoSyncStatus.Unknown,
    readme: dedent(readme),
  };
}

async function findApplicationYamls(): Promise<string[]> {
  const rootDir = await findChartsDir();
  const files = await getFiles(rootDir);
  return files.filter((f) => f.endsWith("application.yaml"));
}

export async function fetchLocalChart(name: string): Promise<ServiceInfo | undefined> {
  const appYamls = await findApplicationYamls();
  for (const appYaml of appYamls) {
    const parsed = YAML.parse(await readFile(appYaml, "utf-8"));
    if (parsed.metadata?.name !== name) continue;
    return buildServiceInfo(appYaml);
  }
  return undefined;
}

export async function fetchLocalCharts(): Promise<ServiceInfo[]> {
  const appYamls = await findApplicationYamls();
  return Promise.all(appYamls.map(buildServiceInfo));
}
