import { AppReadmeSchema } from "./schema";
import type { AppEntry, ScannedReadme } from "./types";
import type { CatalogLogger } from "./logger";

function extractRawFields(content: string): {
  rawName: string;
  description: string;
  sourceCodeUrl: string;
} {
  const lines = content.split("\n");

  const rawName = (lines[0] ?? "")
    .replace(/^#+\s*/, "")
    .replaceAll("`", "")
    .trim();

  const descriptionLines: string[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i] ?? "";
    if (line.startsWith("> ")) {
      descriptionLines.push(line.slice(2).trim());
    } else if (descriptionLines.length > 0) {
      break;
    }
  }
  const description = descriptionLines.join(" ").trim();

  const sourceCodeLine = lines.find((l) => l.startsWith("Source Code: "));
  const sourceCodeUrl = sourceCodeLine?.replace("Source Code: ", "").trim() ?? "";

  return { rawName, description, sourceCodeUrl };
}

export function parseReadme(
  content: string,
  scanned: ScannedReadme,
  logger: CatalogLogger,
): AppEntry | null {
  const { rawName, description, sourceCodeUrl } = extractRawFields(content);

  if (rawName !== scanned.serviceName) {
    logger.error(
      `[${scanned.category}/${scanned.serviceName}] Name mismatch: README has "${rawName}", directory is "${scanned.serviceName}"`,
    );
  }

  const result = AppReadmeSchema.safeParse({ rawName, description, sourceCodeUrl });

  if (!result.success) {
    for (const issue of result.error.issues) {
      logger.error(
        `[${scanned.category}/${scanned.serviceName}] ${String(issue.path[0])}: ${issue.message}`,
      );
    }
    return null;
  }

  return {
    name: result.data.rawName,
    description: result.data.description,
    readmePath: `apps/${scanned.category}/${scanned.serviceName}`,
    sourceCodeUrl: result.data.sourceCodeUrl,
  };
}
