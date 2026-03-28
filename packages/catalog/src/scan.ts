import { access, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import type { App, ScannedReadme } from "./types";

export async function discoverApps(appsDir: string): Promise<App[]> {
  const apps: App[] = [];

  const categories = await readdir(appsDir, { withFileTypes: true });
  await Promise.all(
    categories
      .filter((d) => d.isDirectory())
      .map(async (cat) => {
        const services = await readdir(join(appsDir, cat.name), { withFileTypes: true });
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

export interface ScanResult {
  found: ScannedReadme[];
  missing: { category: string; serviceName: string }[];
}

export async function scanApps(apps: App[]): Promise<ScanResult> {
  const found: ScannedReadme[] = [];
  const missing: { category: string; serviceName: string }[] = [];

  await Promise.all(
    apps.map(async (app) => {
      const readmePath = join(app.dir, "README.md");
      try {
        await access(readmePath);
        found.push({
          absolutePath: resolve(readmePath),
          category: app.category,
          serviceName: app.name,
        });
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code === "ENOENT") {
          missing.push({ category: app.category, serviceName: app.name });
        } else {
          throw err;
        }
      }
    }),
  );

  found.sort((a, b) => {
    const catOrder = a.category.localeCompare(b.category);
    return catOrder !== 0 ? catOrder : a.serviceName.localeCompare(b.serviceName);
  });

  return { found, missing };
}
