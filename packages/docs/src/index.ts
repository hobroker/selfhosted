import { parseCharts } from "./parseCharts";
import { insertMarkdown } from "./insertMarkdown";
import { generateMarkdownTable } from "./generateMarkdownTable";
import chalk from "chalk";
import { getCharts } from "./getCharts";
import { stat } from "fs/promises";
import { join } from "path";

// Find root dir
let rootDir = process.cwd();
try {
  await stat(join(rootDir, "charts"));
} catch {
  rootDir = join(process.cwd(), "../../");
}

const chartsDir = join(rootDir, "charts");
const readmePath = join(rootDir, "README.md");

const sources = await getCharts(chartsDir);
const data = await parseCharts(sources);
const markdown = generateMarkdownTable(data);

await insertMarkdown(markdown, readmePath);

console.log(chalk.green(chalk.bold("✅ Finished generating")));
