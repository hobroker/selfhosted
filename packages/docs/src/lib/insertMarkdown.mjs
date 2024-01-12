import { readFile, writeFile } from "fs/promises";

export const insertMarkdown = async (markdown) => {
  const originalMarkdown = await readFile("README.md", "utf-8");
  const existingMarkdown = originalMarkdown.replace(
    /## Apps([\S\s]*)---\n## References/m,
    "## Apps\n\n___placeholder___\n\n---\n## References",
  );

  const newMarkdown = existingMarkdown.replace("___placeholder___", markdown);

  await writeFile("README.md", newMarkdown);
};
