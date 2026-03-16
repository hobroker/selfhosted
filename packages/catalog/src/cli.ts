import { Command } from "commander";
import { access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { CatalogLogger } from "./logger";
import { buildCatalog } from "./core";
import type { CliOptions } from "./types";

async function findRoot(from: string): Promise<string | null> {
  let dir = from;
  while (true) {
    try {
      await access(join(dir, "apps"));
      await access(join(dir, "README.md"));
      return dir;
    } catch {
      const parent = dirname(dir);
      if (parent === dir) return null;
      dir = parent;
    }
  }
}

const program = new Command();

program
  .name("catalog")
  .description("Scan app READMEs and generate the apps table in root README.md")
  .option("--root <path>", "Root directory of the monorepo (auto-detected if omitted)")
  .option("--check", "Exit 1 if README.md would change (CI mode)", false)
  .option("--dry-run", "Print the result without writing to disk", false)
  .action(async (opts: { root?: string; check: boolean; dryRun: boolean }) => {
    const logger = new CatalogLogger();

    const root = opts.root ?? (await findRoot(process.cwd()));
    if (root === null) {
      logger.error(
        "Could not find a monorepo root (no apps/ + README.md found in parent directories)",
      );
      logger.summarize();
      process.exit(1);
    }

    const options: CliOptions = { root, check: opts.check, dryRun: opts.dryRun };

    await buildCatalog(options, logger);
    logger.summarize();

    if (logger.hasErrors()) {
      process.exit(1);
    }
  });

program.parseAsync(process.argv);
