import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { scanApps } from "./scan";
import { parseReadme } from "./parse";
import { renderCatalog } from "./render";
import { injectCatalog } from "./inject";
import { formatCategoryLabel } from "./render";
import type { CatalogSection, CliOptions } from "./types";
import type { CatalogLogger } from "./logger";

export async function buildCatalog(options: CliOptions, logger: CatalogLogger): Promise<void> {
  const appsDir = join(options.root, "apps");
  const readmePath = join(options.root, "README.md");

  const { found: scannedList, missing } = await scanApps(appsDir);

  logger.info(`Found ${scannedList.length} README(s) across apps/`);

  const sectionMap = new Map<string, CatalogSection>();

  for (const scanned of scannedList) {
    logger.entry(`${scanned.category}/${scanned.serviceName}`);

    const content = await readFile(scanned.absolutePath, "utf-8");
    const entry = parseReadme(content, scanned, logger);

    if (entry === null) continue;

    if (!sectionMap.has(scanned.category)) {
      sectionMap.set(scanned.category, {
        category: scanned.category,
        categoryLabel: formatCategoryLabel(scanned.category),
        entries: [],
      });
    }

    sectionMap.get(scanned.category)!.entries.push(entry);
  }

  for (const { category, serviceName } of missing) {
    logger.error(`${category}/${serviceName} has no README.md`);
  }

  const sections = Array.from(sectionMap.values());
  const markdown = renderCatalog(sections);

  await injectCatalog(markdown, readmePath, options, logger);
}
