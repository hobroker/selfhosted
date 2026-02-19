import { parseCharts } from "./lib/parseCharts.js";
import { insertMarkdown } from "./lib/insertMarkdown.js";
import { generateMarkdownTable } from "./lib/generateMarkdownTable.js";
import chalk from "chalk";
import { getCharts } from "./lib/getCharts.js";

const sources = await getCharts("charts");
const data = await parseCharts(sources);
const markdown = generateMarkdownTable(data);

await insertMarkdown(markdown);

console.log(chalk.green(chalk.bold("✅ Finished generating")));
