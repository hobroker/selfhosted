import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { format, resolveConfig } from "prettier";
import type { App, CliOptions } from "../types";
import type { CatalogLogger } from "../logger";
import { buildGraph } from "./graph";
import { renderMarkdown } from "./render";
import { RULES } from "./rules";

export async function buildDepGraph(
  options: CliOptions,
  logger: CatalogLogger,
  apps: App[],
): Promise<void> {
  const edges = await buildGraph(apps, RULES);
  const markdown = renderMarkdown(apps, edges);

  if (options.dryRun) {
    console.log(markdown);
  } else {
    const outputPath = join(options.root, "DEPENDENCIES.md");
    const config = await resolveConfig(outputPath);
    const formatted = await format(markdown, { ...config, filepath: outputPath });
    await writeFile(outputPath, formatted, "utf8");
    logger.success(`DEPENDENCIES.md updated (${apps.length} apps, ${edges.length} edges)`);
  }
}
