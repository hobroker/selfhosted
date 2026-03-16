import { describe, it, expect, beforeEach } from "vitest";
import { parseReadme } from "./parse";
import { CatalogLogger } from "./logger";
import type { ScannedReadme } from "./types";

const scanned: ScannedReadme = {
  absolutePath: "/apps/media/plex/README.md",
  category: "media",
  serviceName: "plex",
};

const validReadme = `# \`plex\`

> A media server for all your movies and shows.

Source Code: https://github.com/plexinc/pms-docker

## Installation

Run helm...
`;

describe("parseReadme", () => {
  let logger: CatalogLogger;

  beforeEach(() => {
    logger = new CatalogLogger();
  });

  it("returns a valid AppEntry for a well-formed README", () => {
    const entry = parseReadme(validReadme, scanned, logger);
    expect(entry).not.toBeNull();
    expect(entry?.name).toBe("plex");
    expect(entry?.description).toBe("A media server for all your movies and shows.");
    expect(entry?.readmePath).toBe("apps/media/plex");
    expect(entry?.sourceCodeUrl).toBe("https://github.com/plexinc/pms-docker");
    expect(logger.hasErrors()).toBe(false);
  });

  it("strips backticks and heading markers from the name", () => {
    const readme = validReadme.replace("# `plex`", "## `plex`");
    const entry = parseReadme(readme, scanned, logger);
    expect(entry?.name).toBe("plex");
  });

  it("records an error and still returns entry when name mismatches directory", () => {
    const readme = validReadme.replace("# `plex`", "# `jellyfin`");
    const entry = parseReadme(readme, { ...scanned, serviceName: "plex" }, logger);
    expect(logger.hasErrors()).toBe(true);
    expect(logger.getErrors()[0]).toMatch(/mismatch/i);
    // Entry is still null because schema rawName="jellyfin" !== serviceName="plex"
    // but schema itself passes — check that null is returned due to name mismatch only
    // (rawName "jellyfin" is valid; name mismatch only logs, does not short-circuit)
    expect(entry?.name).toBe("jellyfin");
  });

  it("returns null when description is missing", () => {
    const readme = `# \`plex\`

Some other text without blockquote.

Source Code: https://github.com/plexinc/pms-docker
`;
    const entry = parseReadme(readme, scanned, logger);
    expect(entry).toBeNull();
    expect(logger.hasErrors()).toBe(true);
  });

  it("returns null when Source Code URL is missing", () => {
    const readme = `# \`plex\`

> A media server.

No source code line here.
`;
    const entry = parseReadme(readme, scanned, logger);
    expect(entry).toBeNull();
    expect(logger.hasErrors()).toBe(true);
  });

  it("returns null when Source Code URL is not a valid URL", () => {
    const readme = `# \`plex\`

> A media server.

Source Code: not-a-url
`;
    const entry = parseReadme(readme, scanned, logger);
    expect(entry).toBeNull();
    expect(logger.hasErrors()).toBe(true);
  });

  it("joins multi-line descriptions with a space", () => {
    const readme = `# \`plex\`

> Line one.
> Line two.
> Line three.

Source Code: https://github.com/plexinc/pms-docker
`;
    const entry = parseReadme(readme, scanned, logger);
    expect(entry?.description).toBe("Line one. Line two. Line three.");
  });

  it("stops collecting description at the first non-blockquote line", () => {
    const readme = `# \`plex\`

> First line.

> This should not be included.

Source Code: https://github.com/plexinc/pms-docker
`;
    const entry = parseReadme(readme, scanned, logger);
    expect(entry?.description).toBe("First line.");
  });
});
