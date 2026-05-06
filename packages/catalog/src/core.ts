import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { scanApps } from "./scan";
import { parseReadme } from "./parse";
import { renderCatalog } from "./render";
import { injectCatalog } from "./inject";
import { formatCategoryLabel } from "./render";
import type { App, CatalogSection, CliOptions } from "./types";
import type { CatalogLogger } from "./logger";

export async function buildCatalog(
  options: CliOptions,
  logger: CatalogLogger,
  apps: App[],
): Promise<void> {
  const readmePath = join(options.root, "README.md");

  const { found: scannedList, missing } = await scanApps(apps);

  logger.info(`Found ${scannedList.length} README(s) across apps/`);

  const sectionMap = new Map<string, CatalogSection>();

  for (const scanned of scannedList) {
    logger.entry(`${scanned.category}/${scanned.serviceName}`);

    let content: string;
    try {
      content = await readFile(scanned.absolutePath, "utf-8");
    } catch (err) {
      logger.error(
        `${scanned.category}/${scanned.serviceName}: failed to read README.md — ${err instanceof Error ? err.message : String(err)}`,
      );
      continue;
    }

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

  const sections = Array.from(sectionMap.values())
    .sort((a, b) => a.category.localeCompare(b.category))
    .map((s) => ({ ...s, entries: [...s.entries].sort((a, b) => a.name.localeCompare(b.name)) }));

  const markdown = renderCatalog(sections);

  try {
    await injectCatalog(markdown, readmePath, options, logger);
  } catch (err) {
    logger.error(`Failed to write README.md — ${err instanceof Error ? err.message : String(err)}`);
  }
}
