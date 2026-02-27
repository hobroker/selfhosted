import { markdownTable } from "markdown-table";
import { ChartData } from "./types";

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

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
