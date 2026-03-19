/**
 * One-time migration script: converts existing hand-authored README.md files
 * into README.partial.md (frontmatter + custom body, without the install section).
 *
 * Also strips ## Storage sections from existing README.partial.md files since
 * storage tables are now auto-generated from config/pv.yaml + values.yaml.
 *
 * Run: tsx scripts/migrate-readmes.ts
 * After running, verify with: git diff
 * Then commit both README.partial.md and (regenerated) README.md files.
 */

import { readdir, readFile, writeFile, access } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { dump } from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APPS_DIR = resolve(__dirname, "../apps");

function extractHeader(content: string): {
  description: string;
  sourceCode: string;
  chart?: string;
} {
  const lines = content.split("\n");

  const descriptionLines: string[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i] ?? "";
    if (line.startsWith("> ")) {
      descriptionLines.push(line.slice(2).trim());
    } else if (descriptionLines.length > 0) {
      break;
    }
  }

  const sourceCodeLine = lines.find((l) => l.startsWith("Source Code: "));
  const chartLine = lines.find((l) => l.startsWith("Chart: "));

  return {
    description: descriptionLines.join(" ").trim(),
    sourceCode: sourceCodeLine?.replace("Source Code: ", "").trim() ?? "",
    chart: chartLine?.replace("Chart: ", "").trim(),
  };
}

function extractBody(content: string): string {
  // Split into top-level ## sections
  const parts = content.split(/(?=^## )/m);

  // Skip header block, filter out auto-generated sections
  const bodySections = parts
    .slice(1)
    .filter(
      (section) =>
        !section.startsWith("## Installing/upgrading") && !section.startsWith("## Storage"),
    );

  return bodySections.join("").trimStart();
}

function stripStorageSection(content: string): string {
  const parts = content.split(/(?=^## )/m);
  const filtered = parts.filter((section) => !section.startsWith("## Storage"));
  return filtered.join("").trimEnd() + "\n";
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function migrateApp(appDir: string, label: string): Promise<void> {
  const readmePath = join(appDir, "README.md");
  const partialPath = join(appDir, "README.partial.md");

  // If partial already exists, strip its ## Storage section (now auto-generated)
  if (await fileExists(partialPath)) {
    const content = await readFile(partialPath, "utf-8");
    if (content.includes("## Storage")) {
      const stripped = stripStorageSection(content);
      await writeFile(partialPath, stripped);
      console.log(`  ✓ stripped ## Storage from README.partial.md`);
    } else {
      console.log(`  skip: README.partial.md already exists (no ## Storage to strip)`);
    }
    return;
  }

  if (!(await fileExists(readmePath))) {
    console.log(`  skip: no README.md`);
    return;
  }

  const content = await readFile(readmePath, "utf-8");
  const { description, sourceCode, chart } = extractHeader(content);
  const body = extractBody(content);

  if (!description || !sourceCode) {
    console.warn(`  WARN: could not extract description or sourceCode from ${label}`);
    return;
  }

  const frontmatterObj: Record<string, string> = { description, sourceCode };
  if (chart) frontmatterObj.chart = chart;

  const frontmatter = dump(frontmatterObj, { lineWidth: 120 }).trimEnd();
  const partial = `---\n${frontmatter}\n---\n${body ? "\n" + body : ""}`;

  await writeFile(partialPath, partial);
  console.log(`  ✓ wrote README.partial.md`);
}

async function main(): Promise<void> {
  const categories = await readdir(APPS_DIR, { withFileTypes: true });

  for (const cat of categories.filter((d) => d.isDirectory())) {
    const services = await readdir(join(APPS_DIR, cat.name), { withFileTypes: true });
    for (const svc of services.filter((d) => d.isDirectory())) {
      const label = `${cat.name}/${svc.name}`;
      console.log(`${label}`);
      await migrateApp(join(APPS_DIR, cat.name, svc.name), label);
    }
  }

  console.log("\nDone. Now run: npm run generate");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
