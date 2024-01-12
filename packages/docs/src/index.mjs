#!/usr/bin/env node

import { parseCharts } from "./lib/parseCharts.mjs";
import { insertMarkdown } from "./lib/insertMarkdown.mjs";
import { generateMarkdownTable } from "./lib/generateMarkdownTable.mjs";
import chalk from "chalk";

const data = await parseCharts("charts");
const markdown = generateMarkdownTable(data);

await insertMarkdown(markdown);

console.log(chalk.green(chalk.bold("✅ Finished generating")));
