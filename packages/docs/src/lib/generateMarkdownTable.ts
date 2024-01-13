import { markdownTable } from "markdown-table";
import { capitalize } from "./capitalize";
import { ChartData } from "./types";

export const generateMarkdownTable = (data: ChartData[]) => {
  const content = data.map(({ category, services }) => {
    const heading = `### ${capitalize(category)}`;
    const rows = [["Chart", "Description", "Official website"]];
    services.forEach(({ name, path, description, appUrl }) => {
      rows.push([`[${name}](${path})`, description, appUrl]);
    });

    return heading + "\n\n" + markdownTable(rows);
  });

  return content.join("\n\n");
};
