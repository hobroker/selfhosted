import { markdownTable } from "markdown-table";
import { capitalize } from "./capitalize.mjs";

export const generateMarkdownTable = (data) => {
  const content = data.map(({ category, services }) => {
    const heading = `### ${capitalize(category)}`;
    const rows = [["Chart", "Description", "Official website"]];
    services.forEach((service) => {
      rows.push([
        `[${service.name}](${service.readmePath})`,
        service.description,
        service.appUrl,
      ]);
    });

    return heading + "\n\n" + markdownTable(rows);
  });

  return content.join("\n\n");
};
