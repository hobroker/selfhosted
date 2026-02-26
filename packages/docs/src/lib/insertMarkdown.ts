import { readFile, writeFile } from "fs/promises";

const start = "## Apps\n\n";
const end = "\n\n---\n\n## References";
const placeholder = "___placeholder___";
const contentPattern = new RegExp(`${start}([\\S\\s]*)${end}`, "m");

export const insertMarkdown = async (markdown: string, readmePath = "README.md") => {
  const originalMarkdown = await readFile(readmePath, "utf-8");
  const existingMarkdown = originalMarkdown.replace(contentPattern, `${start}${placeholder}${end}`);

  const newMarkdown = existingMarkdown.replace(placeholder, markdown);

  await writeFile(readmePath, newMarkdown);
};
