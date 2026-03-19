import type { CatalogLogger } from "./logger";
import type { AppManifest, PartialReadme } from "./types";

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

function renderManualHelm(manifest: AppManifest, logger?: CatalogLogger): string[] {
  const { name, namespace, pattern } = manifest;
  const needsNamespace = namespace !== "default";
  const namespaceFlags = `--namespace ${namespace} --create-namespace`;
  const lines: string[] = [];

  if (pattern.kind === "helm-repo") {
    const { helmSource, configPath, hasKustomization } = pattern;
    const alias = deriveHelmAlias(helmSource.repoURL, logger);
    const releaseName = helmSource.helm?.releaseName ?? name;

    if (configPath) {
      lines.push(hasKustomization ? "kubectl apply -k config" : "kubectl apply -f config");
    }
    lines.push(`helm repo add ${alias} ${helmSource.repoURL}`);
    lines.push(`helm repo update ${alias}`);

    const versionFlag = helmSource.targetRevision ? `--version ${helmSource.targetRevision} ` : "";
    if (needsNamespace) {
      lines.push(
        `helm upgrade --install ${releaseName} ${alias}/${helmSource.chart} \\`,
        `  ${versionFlag}${namespaceFlags} \\`,
        `  -f values.yaml`,
      );
    } else if (versionFlag) {
      lines.push(
        `helm upgrade --install ${releaseName} ${alias}/${helmSource.chart} \\`,
        `  ${versionFlag}-f values.yaml`,
      );
    } else {
      lines.push(`helm upgrade --install ${releaseName} ${alias}/${helmSource.chart} -f values.yaml`);
    }
  } else {
    // Pattern C: git-based chart
    const { configPath, gitChartSource, hasKustomization } = pattern;
    const releaseName = gitChartSource.helm?.releaseName ?? name;

    lines.push(hasKustomization ? "kubectl apply -k config" : "kubectl apply -f config");
    lines.push(
      `git clone --depth 1 --branch ${gitChartSource.targetRevision} ${gitChartSource.repoURL} /tmp/${name}`,
    );
    lines.push(
      `helm upgrade --install ${releaseName} /tmp/${name}/${gitChartSource.path} \\`,
      `  ${namespaceFlags} \\`,
      `  -f values.yaml`,
    );
    void configPath; // used for kustomization detection above
  }

  return lines;
}

export function renderReadme(
  partial: PartialReadme,
  manifest: AppManifest,
  logger?: CatalogLogger,
): string {
  const { name } = manifest;
  const { description, sourceCode, chart } = partial.frontmatter;

  const lines: string[] = [
    `# \`${name}\``,
    "",
    `> ${description}`,
    "",
    `Source Code: ${sourceCode}`,
  ];

  if (chart) {
    lines.push(`Chart: ${chart}`);
  }

  lines.push(
    "",
    "## Installing/upgrading",
    "",
    "```sh",
    "# Register / update the Application resource",
    "kubectl apply -f application.yaml",
    "",
    "# Then sync the workload - via ArgoCD UI or:",
    `argocd app sync ${name}`,
    "```",
    "",
    "### Manual Helm (without ArgoCD)",
    "",
    "```sh",
    ...renderManualHelm(manifest, logger),
    "```",
  );

  if (partial.body.trim()) {
    lines.push("", partial.body.trimEnd());
  }

  return lines.join("\n") + "\n";
}
