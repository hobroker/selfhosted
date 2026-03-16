import { glob } from "tinyglobby";
import { resolve } from "node:path";
import type { ScannedReadme } from "./types";

export async function scanReadmes(appsDir: string): Promise<ScannedReadme[]> {
  const matches = await glob("*/*/README.md", { cwd: appsDir, absolute: false });

  const scanned: ScannedReadme[] = matches.map((relativePath) => {
    const parts = relativePath.split("/");
    const category = parts[0] ?? "";
    const serviceName = parts[1] ?? "";
    return {
      absolutePath: resolve(appsDir, relativePath),
      category,
      serviceName,
    };
  });

  return scanned.sort((a, b) => {
    const catOrder = a.category.localeCompare(b.category);
    return catOrder !== 0 ? catOrder : a.serviceName.localeCompare(b.serviceName);
  });
}
