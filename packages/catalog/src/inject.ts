import { readFile, writeFile } from "node:fs/promises";
import { format, resolveConfig } from "prettier";
import type { CliOptions } from "./types";
import type { CatalogLogger } from "./logger";

async function formatMarkdown(content: string, filepath: string): Promise<string> {
  const config = await resolveConfig(filepath);
  return format(content, { ...config, filepath });
}

const MARKER_START = "<!-- apps:start -->";
const MARKER_END = "<!-- apps:end -->";
const BLOCK_PATTERN = new RegExp(
  `(${MARKER_START})([\\s\\S]*?)(${MARKER_END})`,
  "m",
);

export function buildUpdatedReadme(original: string, newBlock: string): string {
  return original.replace(BLOCK_PATTERN, `$1\n\n${newBlock}\n\n$3`);
}

export function contentWouldChange(original: string, newBlock: string): boolean {
  return buildUpdatedReadme(original, newBlock) !== original;
}

export async function injectCatalog(
  newBlock: string,
  readmePath: string,
  options: Pick<CliOptions, "check" | "dryRun">,
  logger: CatalogLogger,
): Promise<void> {
  const original = await readFile(readmePath, "utf-8");

  if (!BLOCK_PATTERN.test(original)) {
    logger.error(
      `README.md is missing injection markers (${MARKER_START} / ${MARKER_END})`,
    );
    return;
  }

  const updated = await formatMarkdown(buildUpdatedReadme(original, newBlock), readmePath);

  if (options.check) {
    if (updated !== original) {
      logger.error("README.md is out of date — run `npm run generate` to update it");
    } else {
      logger.success("README.md is up to date");
    }
    return;
  }

  if (options.dryRun) {
    console.log("\n--- dry-run output ---\n");
    console.log(updated);
    return;
  }

  await writeFile(readmePath, updated);
  logger.success("README.md updated");
}
