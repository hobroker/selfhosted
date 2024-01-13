#!/usr/bin/env node

import { parseCharts } from "./lib/parseCharts";
import { insertMarkdown } from "./lib/insertMarkdown";
import { generateMarkdownTable } from "./lib/generateMarkdownTable";
import chalk from "chalk";
import { getCharts } from "./lib/getCharts";

const sources = await getCharts("charts");
const data = await parseCharts(sources);
const markdown = generateMarkdownTable(data);

await insertMarkdown(markdown);

console.log(chalk.green(chalk.bold("✅ Finished generating")));
