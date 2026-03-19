import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { scanAppsForGeneration } from "./scan";
import { parsePartialReadme } from "./parse-partial";
import { parseEntryFromPartial } from "./parse";
import { renderCatalog, formatCategoryLabel } from "./render";
import { injectCatalog } from "./inject";
import type { CatalogSection, CliOptions } from "./types";
import type { CatalogLogger } from "./logger";

export async function buildCatalog(options: CliOptions, logger: CatalogLogger): Promise<void> {
  const appsDir = join(options.root, "apps");
  const readmePath = join(options.root, "README.md");

  const apps = await scanAppsForGeneration(appsDir);

  logger.info(`Found ${apps.length} app(s) across apps/`);

  const sectionMap = new Map<string, CatalogSection>();

  for (const app of apps) {
    const label = `${app.category}/${app.serviceName}`;

    if (!app.hasPartial) {
      logger.warn(`${label}: no README.partial.md — skipping catalog entry`);
      continue;
    }

    logger.info(label);

    let content: string;
    try {
      content = await readFile(join(app.appDir, "README.partial.md"), "utf-8");
    } catch (err) {
      logger.error(
        `${label}: failed to read README.partial.md — ${err instanceof Error ? err.message : String(err)}`,
      );
      continue;
    }

    let partial;
    try {
      partial = parsePartialReadme(content);
    } catch (err) {
      logger.error(
        `${label}: failed to parse README.partial.md — ${err instanceof Error ? err.message : String(err)}`,
      );
      continue;
    }

    const entry = parseEntryFromPartial(partial, app);

    if (!sectionMap.has(app.category)) {
      sectionMap.set(app.category, {
        category: app.category,
        categoryLabel: formatCategoryLabel(app.category),
        entries: [],
      });
    }

    sectionMap.get(app.category)!.entries.push(entry);
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
