export const generateMarkdown = (data) => {
  const content = data.map(({ category, services }) => {
    const heading = `### ${category}`;
    const rows = services.map((service) => {
      let content = `- [${service.name}](${service.readmePath})`;
      if (service.description) {
        content += ` - ${service.description}`;
      }
      return content;
    });

    return {
      heading,
      rows,
    };
  });

  return content.reduce((acc, { heading, rows }) => {
    return `${acc}\n${heading}\n${rows.join("\n")}`;
  }, "");
};
