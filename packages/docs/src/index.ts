import { parseRawCategories } from "./parseRawCategories";
import { insertMarkdown } from "./insertMarkdown";
import { generateMarkdownTable } from "./generateMarkdownTable";
import chalk from "chalk";
import { findRawCategories } from "./findApps";
import { stat } from "fs/promises";
import { join } from "path";

// Find root dir
let rootDir = process.cwd();
try {
  await stat(join(rootDir, "apps"));
} catch {
  rootDir = join(process.cwd(), "../../");
}

const appsDir = join(rootDir, "apps");
const readmePath = join(rootDir, "README.md");

const rawCategories = await findRawCategories(appsDir);
const data = parseRawCategories(rawCategories);
const markdown = generateMarkdownTable(data);

await insertMarkdown(markdown, readmePath);

console.log(chalk.green(chalk.bold("✅ Finished generating")));
