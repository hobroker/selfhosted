import { describe, it, expect } from "vitest";
import { formatCategoryLabel, renderTable, renderSection, renderCatalog } from "./render";
import type { AppEntry, CatalogSection } from "./types";

const entry: AppEntry = {
  name: "plex",
  description: "A media server.",
  readmePath: "apps/media/plex",
  sourceCodeUrl: "https://github.com/plexinc/pms-docker",
};

describe("formatCategoryLabel", () => {
  it("title-cases regular category names", () => {
    expect(formatCategoryLabel("media")).toBe("Media");
    expect(formatCategoryLabel("automation")).toBe("Automation");
  });

  it("uppercases known acronyms", () => {
    expect(formatCategoryLabel("ai")).toBe("AI");
  });
});

describe("renderTable", () => {
  it("produces a header, separator, and one row for a single entry", () => {
    const table = renderTable([entry]);
    const lines = table.split("\n");
    expect(lines).toHaveLength(3);
    expect(lines[0]).toBe("| App | Description | Source Code |");
    expect(lines[1]).toBe("| --- | --- | --- |");
    expect(lines[2]).toContain("[plex](apps/media/plex)");
    expect(lines[2]).toContain("A media server.");
    expect(lines[2]).toContain("<https://github.com/plexinc/pms-docker>");
  });

  it("escapes pipe characters in descriptions", () => {
    const piped: AppEntry = { ...entry, description: "supports a|b modes" };
    const table = renderTable([piped]);
    expect(table).toContain("a\\|b");
  });

  it("escapes pipe characters in names", () => {
    const piped: AppEntry = { ...entry, name: "foo|bar" };
    const table = renderTable([piped]);
    expect(table).toContain("[foo\\|bar]");
  });

  it("produces correct row count for multiple entries", () => {
    const entries = [entry, { ...entry, name: "jellyfin" }, { ...entry, name: "sonarr" }];
    const lines = renderTable(entries).split("\n");
    expect(lines).toHaveLength(5); // header + separator + 3 rows
  });
});

describe("renderSection", () => {
  it("starts with the category heading", () => {
    const section: CatalogSection = {
      category: "media",
      categoryLabel: "Media",
      entries: [entry],
    };
    const result = renderSection(section);
    expect(result.startsWith("### Media\n\n")).toBe(true);
  });
});

describe("renderCatalog", () => {
  it("joins sections with a blank line", () => {
    const s1: CatalogSection = {
      category: "automation",
      categoryLabel: "Automation",
      entries: [entry],
    };
    const s2: CatalogSection = { category: "media", categoryLabel: "Media", entries: [entry] };
    const result = renderCatalog([s1, s2]);
    expect(result).toContain("### Automation");
    expect(result).toContain("### Media");
    // Two sections separated by exactly one blank line
    expect(result).toMatch(/\n\n### Media/);
  });
});
