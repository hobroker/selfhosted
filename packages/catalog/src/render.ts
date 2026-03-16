import type { AppEntry, CatalogSection } from "./types";

const LABEL_OVERRIDES = new Map<string, string>([["ai", "AI"]]);

export function formatCategoryLabel(raw: string): string {
  return LABEL_OVERRIDES.get(raw) ?? raw.charAt(0).toUpperCase() + raw.slice(1);
}

function escapeCell(value: string): string {
  return value.replaceAll("|", "\\|");
}

export function renderTable(entries: AppEntry[]): string {
  const header = "| App | Description | Source Code |";
  const separator = "| --- | --- | --- |";
  const rows = entries.map(
    ({ name, readmePath, description, sourceCodeUrl }) =>
      `| [${escapeCell(name)}](${readmePath}) | ${escapeCell(description)} | <${sourceCodeUrl}> |`,
  );
  return [header, separator, ...rows].join("\n");
}

export function renderSection(section: CatalogSection): string {
  return `### ${section.categoryLabel}\n\n${renderTable(section.entries)}`;
}

export function renderCatalog(sections: CatalogSection[]): string {
  return sections.map(renderSection).join("\n\n");
}
