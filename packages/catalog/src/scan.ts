import { access, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import type { ScannedApp, ScannedReadme } from "./types";

export interface ScanResult {
  found: ScannedReadme[];
  missing: { category: string; serviceName: string }[];
}

export async function scanApps(appsDir: string): Promise<ScanResult> {
  const found: ScannedReadme[] = [];
  const missing: { category: string; serviceName: string }[] = [];

  const categories = await readdir(appsDir, { withFileTypes: true });
  await Promise.all(
    categories
      .filter((d) => d.isDirectory())
      .map(async (cat) => {
        const services = await readdir(join(appsDir, cat.name), { withFileTypes: true });
        await Promise.all(
          services
            .filter((d) => d.isDirectory())
            .map(async (svc) => {
              const readmePath = join(appsDir, cat.name, svc.name, "README.md");
              try {
                await access(readmePath);
                found.push({
                  absolutePath: resolve(readmePath),
                  category: cat.name,
                  serviceName: svc.name,
                });
              } catch (err) {
                if ((err as NodeJS.ErrnoException).code === "ENOENT") {
                  missing.push({ category: cat.name, serviceName: svc.name });
                } else {
                  throw err;
                }
              }
            }),
        );
      }),
  );

  found.sort((a, b) => {
    const catOrder = a.category.localeCompare(b.category);
    return catOrder !== 0 ? catOrder : a.serviceName.localeCompare(b.serviceName);
  });

  return { found, missing };
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function scanAppsForGeneration(appsDir: string): Promise<ScannedApp[]> {
  const result: ScannedApp[] = [];

  const categories = await readdir(appsDir, { withFileTypes: true });
  await Promise.all(
    categories
      .filter((d) => d.isDirectory())
      .map(async (cat) => {
        const services = await readdir(join(appsDir, cat.name), { withFileTypes: true });
        await Promise.all(
          services
            .filter((d) => d.isDirectory())
            .map(async (svc) => {
              const appDir = resolve(join(appsDir, cat.name, svc.name));
              const [hasPartial, hasApplicationYaml, hasKustomization] = await Promise.all([
                fileExists(join(appDir, "README.partial.md")),
                fileExists(join(appDir, "application.yaml")),
                fileExists(join(appDir, "config", "kustomization.yaml")),
              ]);
              result.push({
                category: cat.name,
                serviceName: svc.name,
                appDir,
                hasPartial,
                hasApplicationYaml,
                hasKustomization,
              });
            }),
        );
      }),
  );

  result.sort((a, b) => {
    const catOrder = a.category.localeCompare(b.category);
    return catOrder !== 0 ? catOrder : a.serviceName.localeCompare(b.serviceName);
  });

  return result;
}
