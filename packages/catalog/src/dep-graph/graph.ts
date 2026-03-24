import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import type { DependencyRule } from "./rules";

export interface App {
  name: string;
  category: string;
  dir: string;
}

export interface Edge {
  from: string;
  to: string;
  label: string;
  optional: boolean;
}

export async function discoverApps(appsDir: string): Promise<App[]> {
  const apps: App[] = [];

  const categories = await readdir(appsDir, { withFileTypes: true });
  await Promise.all(
    categories
      .filter((d) => d.isDirectory())
      .map(async (cat) => {
        const services = await readdir(join(appsDir, cat.name), {
          withFileTypes: true,
        });
        for (const svc of services.filter((d) => d.isDirectory())) {
          apps.push({
            name: svc.name,
            category: cat.name,
            dir: join(appsDir, cat.name, svc.name),
          });
        }
      }),
  );

  return apps.sort((a, b) => {
    const catOrder = a.category.localeCompare(b.category);
    return catOrder !== 0 ? catOrder : a.name.localeCompare(b.name);
  });
}

async function collectYamlContent(appDir: string): Promise<string> {
  const chunks: string[] = [];

  async function walk(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });
    await Promise.all(
      entries.map(async (entry) => {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
          await walk(full);
        } else if (/\.ya?ml$/.test(entry.name)) {
          chunks.push(await readFile(full, "utf8"));
        }
      }),
    );
  }

  await walk(appDir);
  return chunks.join("\n");
}

export async function buildGraph(apps: App[], rules: DependencyRule[]): Promise<Edge[]> {
  const appNames = new Set(apps.map((a) => a.name));
  const edges: Edge[] = [];

  await Promise.all(
    apps.map(async (app) => {
      const content = await collectYamlContent(app.dir);
      for (const rule of rules) {
        if (app.name === rule.provider) continue; // skip self
        if (!appNames.has(rule.provider)) continue; // skip unknown providers
        if (rule.detect(content)) {
          edges.push({
            from: app.name,
            to: rule.provider,
            label: rule.label,
            optional: rule.optional ?? false,
          });
        }
      }
    }),
  );

  return edges.sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to));
}
