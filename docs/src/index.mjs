import { generateMarkdown } from "./generateMarkdown.mjs";
import { parseCharts } from "./parseCharts.mjs";
import { insertMarkdown } from "./insertMarkdown.mjs";

const data = await parseCharts("charts");
const markdown = generateMarkdown(data);

// console.log("markdown", markdown);

await insertMarkdown(markdown);
