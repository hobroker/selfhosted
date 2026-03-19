import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { scanAppsForGeneration } from "./scan";
import { parseApplication } from "./parse-application";
import { renderReadme } from "./render-readme";
import { formatMarkdown } from "./inject";
import { parsePartialReadme } from "./parse-partial";
import type { AppManifest, CliOptions, PartialReadme } from "./types";
import type { CatalogLogger } from "./logger";

export async function buildReadmes(options: CliOptions, logger: CatalogLogger): Promise<void> {
  const appsDir = join(options.root, "apps");
  const apps = await scanAppsForGeneration(appsDir);

  logger.info(`Found ${apps.length} app(s) across apps/`);

  await Promise.all(
    apps.map(async (app) => {
      const label = `${app.category}/${app.serviceName}`;

      if (!app.hasPartial) {
        logger.warn(`${label}: no README.partial.md — skipping`);
        return;
      }
      if (!app.hasApplicationYaml) {
        logger.warn(`${label}: no application.yaml — skipping`);
        return;
      }

      let partial: PartialReadme;
      try {
        const content = await readFile(join(app.appDir, "README.partial.md"), "utf-8");
        partial = parsePartialReadme(content);
      } catch (err) {
        logger.error(
          `${label}: failed to parse README.partial.md — ${err instanceof Error ? err.message : String(err)}`,
        );
        return;
      }

      let manifest: AppManifest;
      try {
        const content = await readFile(join(app.appDir, "application.yaml"), "utf-8");
        manifest = parseApplication(content, app.hasKustomization);
      } catch (err) {
        logger.error(
          `${label}: failed to parse application.yaml — ${err instanceof Error ? err.message : String(err)}`,
        );
        return;
      }

      const rendered = renderReadme(partial, manifest, logger);
      const readmePath = join(app.appDir, "README.md");

      let formatted: string;
      try {
        formatted = await formatMarkdown(rendered, readmePath);
      } catch (err) {
        logger.error(
          `${label}: failed to format — ${err instanceof Error ? err.message : String(err)}`,
        );
        return;
      }

      if (options.check) {
        let existing = "";
        try {
          existing = await readFile(readmePath, "utf-8");
        } catch {
          // file doesn't exist yet
        }
        if (formatted !== existing) {
          logger.error(`${label}: README.md is out of date — run \`npm run generate\``);
        }
        return;
      }

      if (options.dryRun) {
        console.log(`\n--- ${label}/README.md ---\n`);
        console.log(formatted);
        return;
      }

      await writeFile(readmePath, formatted);
      logger.success(`${label}: README.md updated`);
    }),
  );
}
