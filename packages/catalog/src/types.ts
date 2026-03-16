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
