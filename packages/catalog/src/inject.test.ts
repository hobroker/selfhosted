import { buildUpdatedReadme, contentWouldChange, injectCatalog } from "./inject";
import { CatalogLogger } from "./logger";

vi.mock("prettier", () => ({
  resolveConfig: vi.fn().mockResolvedValue(null),
  format: vi.fn().mockImplementation(async (content: string) => content),
}));

const BLOCK = "### Media\n\n| App | Description | Source Code |\n| --- | --- | --- |";

const readmeWithMarkers = `# My Project

<!-- apps:start -->

### Old Content

<!-- apps:end -->

Footer text.
`;

const readmeWithoutMarkers = `# My Project\n\nNo markers here.\n`;

describe("buildUpdatedReadme", () => {
  it("replaces the block between markers", () => {
    const result = buildUpdatedReadme(readmeWithMarkers, BLOCK);
    expect(result).toContain(BLOCK);
    expect(result).not.toContain("Old Content");
    expect(result).toContain("<!-- apps:start -->");
    expect(result).toContain("<!-- apps:end -->");
  });

  it("preserves content outside the markers", () => {
    const result = buildUpdatedReadme(readmeWithMarkers, BLOCK);
    expect(result).toContain("# My Project");
    expect(result).toContain("Footer text.");
  });
});

describe("contentWouldChange", () => {
  it("returns true when the block differs", () => {
    expect(contentWouldChange(readmeWithMarkers, BLOCK)).toBe(true);
  });

  it("returns false when the README already contains the block", () => {
    const already = buildUpdatedReadme(readmeWithMarkers, BLOCK);
    expect(contentWouldChange(already, BLOCK)).toBe(false);
  });
});

describe("injectCatalog", () => {
  let logger: CatalogLogger;

  beforeEach(() => {
    logger = new CatalogLogger();
    vi.restoreAllMocks();
  });

  it("logs an error when markers are missing", async () => {
    vi.mock("node:fs/promises", () => ({ readFile: vi.fn(), writeFile: vi.fn() }));
    const { readFile } = await import("node:fs/promises");
    vi.mocked(readFile).mockResolvedValue(readmeWithoutMarkers as never);

    await injectCatalog(BLOCK, "README.md", { check: false, dryRun: false }, logger);
    expect(logger.hasErrors()).toBe(true);
    expect(logger.getErrors()[0]).toMatch(/markers/i);
  });

  it("--check: logs error when README would change", async () => {
    vi.mock("node:fs/promises", () => ({ readFile: vi.fn(), writeFile: vi.fn() }));
    const { readFile } = await import("node:fs/promises");
    vi.mocked(readFile).mockResolvedValue(readmeWithMarkers as never);

    await injectCatalog(BLOCK, "README.md", { check: true, dryRun: false }, logger);
    expect(logger.hasErrors()).toBe(true);
    expect(logger.getErrors()[0]).toMatch(/out of date/i);
  });

  it("--check: no error when README is already up to date", async () => {
    vi.mock("node:fs/promises", () => ({ readFile: vi.fn(), writeFile: vi.fn() }));
    const { readFile } = await import("node:fs/promises");
    const upToDate = buildUpdatedReadme(readmeWithMarkers, BLOCK);
    vi.mocked(readFile).mockResolvedValue(upToDate as never);

    await injectCatalog(BLOCK, "README.md", { check: true, dryRun: false }, logger);
    expect(logger.hasErrors()).toBe(false);
  });

  it("--dry-run: does not call writeFile", async () => {
    vi.mock("node:fs/promises", () => ({ readFile: vi.fn(), writeFile: vi.fn() }));
    const { readFile, writeFile } = await import("node:fs/promises");
    vi.mocked(readFile).mockResolvedValue(readmeWithMarkers as never);

    await injectCatalog(BLOCK, "README.md", { check: false, dryRun: true }, logger);
    expect(writeFile).not.toHaveBeenCalled();
  });

  it("normal mode: calls writeFile with updated content", async () => {
    vi.mock("node:fs/promises", () => ({ readFile: vi.fn(), writeFile: vi.fn() }));
    const { readFile, writeFile } = await import("node:fs/promises");
    vi.mocked(readFile).mockResolvedValue(readmeWithMarkers as never);
    vi.mocked(writeFile).mockResolvedValue(undefined);

    await injectCatalog(BLOCK, "README.md", { check: false, dryRun: false }, logger);
    expect(writeFile).toHaveBeenCalledOnce();
    const [, written] = vi.mocked(writeFile).mock.calls[0] ?? [];
    expect(written as string).toContain(BLOCK);
  });
});
