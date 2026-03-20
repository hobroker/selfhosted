import { Command } from "commander";
import { access, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { discoverApps, buildGraph } from "./graph.js";
import { renderMarkdown } from "./render.js";
import { RULES } from "./rules.js";

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
  .name("dep-graph")
  .description("Scan app YAML files and generate a Mermaid dependency graph")
  .option("--root <path>", "Root directory of the monorepo (auto-detected if omitted)")
  .option("--output <path>", "Output file path relative to root", "DEPENDENCIES.md")
  .option("--dry-run", "Print the result without writing to disk", false)
  .action(
    async (opts: { root?: string; output: string; dryRun: boolean }) => {
      const root = opts.root ?? (await findRoot(process.cwd()));
      if (root === null) {
        console.error(
          "Could not find monorepo root (no apps/ + README.md in parent directories)",
        );
        process.exit(1);
      }

      const apps = await discoverApps(join(root, "apps"));
      const edges = await buildGraph(apps, RULES);
      const markdown = renderMarkdown(apps, edges);

      if (opts.dryRun) {
        console.log(markdown);
        return;
      }

      const outputPath = join(root, opts.output);
      await writeFile(outputPath, markdown, "utf8");
      console.log(`Written to ${outputPath}`);
      console.log(`${apps.length} apps, ${edges.length} dependencies detected`);
    },
  );

program.parseAsync(process.argv);
