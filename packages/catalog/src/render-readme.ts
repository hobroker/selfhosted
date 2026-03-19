import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ejs from "ejs";
const ejsRender = ejs.render.bind(ejs);
import type { CatalogLogger } from "./logger";
import type { AppManifest, PartialReadme, StorageMount } from "./types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE = readFileSync(join(__dirname, "readme.template.ejs"), "utf-8");
const PATTERN_TEMPLATES: Record<string, string> = {
  "helm-repo": readFileSync(join(__dirname, "patterns/helm-repo.ejs"), "utf-8"),
  "git-chart": readFileSync(join(__dirname, "patterns/git-chart.ejs"), "utf-8"),
};

// ── Helm repo alias lookup ────────────────────────────────────────────────────

export const KNOWN_ALIASES: Record<string, string> = {
  "https://argoproj.github.io/argo-helm": "argo",
  "https://bjw-s-labs.github.io/helm-charts": "bjw-s",
  "https://charts.jetstack.io": "jetstack",
  "https://dl.cloudsmith.io/public/infisical/helm-charts/helm/charts/": "infisical-helm-charts",
  "https://helm.traefik.io/traefik": "traefik",
  "https://metallb.github.io/metallb": "metallb",
  "https://prometheus-community.github.io/helm-charts": "prometheus-community",
  "https://releases.rancher.com/server-charts/latest": "rancher-latest",
  "https://serhanekicii.github.io/openclaw-helm": "openclaw",
  "https://stakater.github.io/stakater-charts": "stakater",
};

export function deriveHelmAlias(repoURL: string, logger?: CatalogLogger): string {
  const normalized = repoURL.replace(/\/$/, "");
  const known = KNOWN_ALIASES[normalized] ?? KNOWN_ALIASES[normalized + "/"];
  if (known) return known;

  // Fallback heuristic: last path segment (strip common suffixes) or first subdomain label
  let candidate: string;
  try {
    const url = new URL(repoURL);
    const segments = url.pathname.split("/").filter(Boolean);
    const fromPath = segments
      .at(-1)
      ?.replace(/-helm$/, "")
      .replace(/-charts$/, "");
    const fromHost = url.hostname.split(".")[0];
    candidate = fromPath || fromHost || "unknown";
  } catch {
    candidate = "unknown";
  }

  logger?.warn(
    `Unknown helm repo URL "${repoURL}" — falling back to alias "${candidate}". Add it to KNOWN_ALIASES in render-readme.ts`,
  );
  return candidate;
}

// ── README renderer ───────────────────────────────────────────────────────────

export function renderReadme(
  partial: PartialReadme,
  manifest: AppManifest,
  storage: StorageMount[],
  logger?: CatalogLogger,
): string {
  const { name, namespace, pattern } = manifest;
  const { description, sourceCode, chart } = partial.frontmatter;

  const needsNamespace = namespace !== "default";
  const namespaceFlags = `--namespace ${namespace} --create-namespace`;

  let patternData: Record<string, unknown>;

  if (pattern.kind === "helm-repo") {
    patternData = {
      kind: "helm-repo",
      alias: deriveHelmAlias(pattern.helmSource.repoURL, logger),
      releaseName: pattern.helmSource.helm?.releaseName ?? name,
      helmSource: pattern.helmSource,
      configPath: pattern.configPath,
      hasKustomization: pattern.hasKustomization,
      needsNamespace,
      namespaceFlags,
      targetRevision: pattern.helmSource.targetRevision,
    };
  } else {
    patternData = {
      kind: "git-chart",
      releaseName: pattern.gitChartSource.helm?.releaseName ?? name,
      gitChartSource: pattern.gitChartSource,
      hasKustomization: pattern.hasKustomization,
      needsNamespace,
      namespaceFlags,
    };
  }

  const manualHelm = ejsRender(PATTERN_TEMPLATES[patternData.kind as string]!, {
    name,
    pattern: patternData,
  });

  return ejsRender(TEMPLATE, {
    name,
    description,
    sourceCode,
    chart,
    body: partial.body,
    manualHelm,
    storage,
  });
}
