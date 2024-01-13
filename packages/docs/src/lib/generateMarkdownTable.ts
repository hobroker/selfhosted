import { markdownTable } from "markdown-table";
import { capitalize } from "./capitalize";
import { ChartData } from "./types";

export const generateMarkdownTable = (data: ChartData[]) => {
  const content = data.map(({ category, services }) => {
    const heading = `### ${capitalize(category)}`;
    const rows = [
      ["Chart", "Description", "Source Code"],
      ...services.map(({ name, url, description }) => [
        `[${name}](${url.local})`,
        description,
        url.sourceCode,
      ]),
    ];

    return heading + "\n\n" + markdownTable(rows);
  });

  return content.join("\n\n");
};
