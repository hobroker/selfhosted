import { access, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import type { ScannedReadme } from "./types";

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
