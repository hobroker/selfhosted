import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { load } from "js-yaml";
import { PartialReadmeFrontmatterSchema } from "./schema";
import type { PartialReadme } from "./types";

export function parsePartialReadme(content: string): PartialReadme {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error("Missing frontmatter — expected content between --- delimiters");
  }

  const raw = load(match[1]!);
  const result = PartialReadmeFrontmatterSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(`Invalid frontmatter: ${result.error.message}`);
  }

  return {
    frontmatter: result.data,
    body: match[2]!.trimStart(),
  };
}

export async function readPartialReadme(appDir: string): Promise<PartialReadme> {
  const content = await readFile(join(appDir, "README.partial.md"), "utf-8");
  return parsePartialReadme(content);
}
