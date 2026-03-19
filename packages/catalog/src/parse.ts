import type { AppEntry, PartialReadme } from "./types";

export function parseEntryFromPartial(
  partial: PartialReadme,
  scanned: { category: string; serviceName: string },
): AppEntry {
  return {
    name: scanned.serviceName,
    description: partial.frontmatter.description,
    readmePath: `apps/${scanned.category}/${scanned.serviceName}`,
    sourceCodeUrl: partial.frontmatter.sourceCode,
  };
}
