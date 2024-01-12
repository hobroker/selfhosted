#!/usr/bin/env node

import { generateMarkdown } from "./lib/generateMarkdown.mjs";
import { parseCharts } from "./lib/parseCharts.mjs";
import { insertMarkdown } from "./lib/insertMarkdown.mjs";

const data = await parseCharts("charts");
const markdown = generateMarkdown(data);

await insertMarkdown(markdown);
