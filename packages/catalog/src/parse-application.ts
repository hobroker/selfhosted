import { load } from "js-yaml";
import { AppManifestRawSchema } from "./schema";
import type { AppManifest, AppPattern, AppSource } from "./types";

function classifyPattern(
  name: string,
  sources: AppSource[],
  hasKustomization: boolean,
): AppPattern {
  const nonValues = sources.filter((s) => !s.ref);

  // Pattern C: git-based chart — an external (non-selfhosted) source has both path + helm
  const externalGitChart = nonValues.find(
    (s) => s.path && !s.repoURL.includes("hobroker/selfhosted") && s.helm,
  );
  if (externalGitChart) {
    const configSource = nonValues.find(
      (s) => s.path && s.repoURL.includes("hobroker/selfhosted"),
    );
    return {
      kind: "git-chart",
      configPath: configSource?.path ?? `apps/system/${name}/config`,
      gitChartSource: externalGitChart,
      hasKustomization,
    };
  }

  // Pattern A or B: standard helm repo chart
  const helmRepoSource = nonValues.find((s) => s.chart && !s.path);
  const configSource = nonValues.find(
    (s) => s.path && s.repoURL.includes("hobroker/selfhosted"),
  );

  if (!helmRepoSource) {
    throw new Error(`Could not identify a helm chart source for app "${name}"`);
  }

  return {
    kind: "helm-repo",
    helmSource: helmRepoSource,
    configPath: configSource?.path,
    hasKustomization,
  };
}

export function parseApplication(yamlContent: string, hasKustomization: boolean): AppManifest {
  const raw = load(yamlContent);
  const result = AppManifestRawSchema.safeParse(raw);

  if (!result.success) {
    throw new Error(`Invalid application.yaml: ${result.error.message}`);
  }

  const { name } = result.data.metadata;
  const { sources, destination } = result.data.spec;

  const pattern = classifyPattern(name, sources as AppSource[], hasKustomization);

  return {
    name,
    namespace: destination.namespace,
    pattern,
  };
}
