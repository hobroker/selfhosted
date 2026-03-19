export interface ScannedReadme {
  absolutePath: string;
  category: string;
  serviceName: string;
}

export interface AppEntry {
  name: string;
  description: string;
  readmePath: string;
  sourceCodeUrl: string;
}

export interface CatalogSection {
  category: string;
  categoryLabel: string;
  entries: AppEntry[];
}

export interface CliOptions {
  root: string;
  check: boolean;
  dryRun: boolean;
}

// ── README generation types ──────────────────────────────────────────────────

export interface PartialReadmeFrontmatter {
  description: string;
  sourceCode: string;
  chart?: string;
}

export interface PartialReadme {
  frontmatter: PartialReadmeFrontmatter;
  body: string;
}

export interface AppSource {
  repoURL: string;
  chart?: string;
  targetRevision?: string;
  path?: string;
  ref?: string;
  helm?: {
    releaseName?: string;
    valueFiles?: string[];
  };
}

export type AppPattern =
  | { kind: "helm-repo"; helmSource: AppSource; configPath?: string; hasKustomization: boolean }
  | { kind: "git-chart"; configPath: string; gitChartSource: AppSource; hasKustomization: boolean };

export interface AppManifest {
  name: string;
  namespace: string;
  pattern: AppPattern;
}

export interface ScannedApp {
  category: string;
  serviceName: string;
  appDir: string;
  hasPartial: boolean;
  hasApplicationYaml: boolean;
  hasKustomization: boolean;
}
