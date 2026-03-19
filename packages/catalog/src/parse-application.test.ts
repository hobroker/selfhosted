import { describe, expect, it } from "vitest";
import { parseApplication } from "./parse-application";

const makeYaml = (overrides: {
  name?: string;
  namespace?: string;
  sources?: string;
}) => `
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: ${overrides.name ?? "myapp"}
  namespace: argocd
spec:
  sources:
${overrides.sources ?? `    - repoURL: https://bjw-s-labs.github.io/helm-charts
      chart: app-template
      targetRevision: 4.6.2
      helm:
        valueFiles:
          - $values/apps/backup/myapp/values.yaml
    - repoURL: https://github.com/hobroker/selfhosted.git
      targetRevision: HEAD
      ref: values`}
  destination:
    server: https://kubernetes.default.svc
    namespace: ${overrides.namespace ?? "default"}
`;

const patternASources = `    - repoURL: https://github.com/hobroker/selfhosted.git
      targetRevision: HEAD
      path: apps/backup/backrest/config
    - repoURL: https://bjw-s-labs.github.io/helm-charts
      chart: app-template
      targetRevision: 4.6.2
      helm:
        valueFiles:
          - $values/apps/backup/backrest/values.yaml
    - repoURL: https://github.com/hobroker/selfhosted.git
      targetRevision: HEAD
      ref: values`;

const patternCSources = `    - repoURL: https://github.com/hobroker/selfhosted.git
      targetRevision: HEAD
      path: apps/system/local-path-provisioner/config
    - repoURL: https://github.com/rancher/local-path-provisioner.git
      targetRevision: v0.0.35
      path: deploy/chart/local-path-provisioner
      helm:
        valueFiles:
          - $values/apps/system/local-path-provisioner/values.yaml
    - repoURL: https://github.com/hobroker/selfhosted.git
      targetRevision: HEAD
      ref: values`;

const releaseNameSources = `    - repoURL: https://github.com/hobroker/selfhosted.git
      targetRevision: HEAD
      path: apps/monitoring/prometheus-operator/config
    - repoURL: https://prometheus-community.github.io/helm-charts
      chart: kube-prometheus-stack
      targetRevision: 82.0.0
      helm:
        releaseName: prometheus-operator
        valueFiles:
          - $values/apps/monitoring/prometheus-operator/values.yaml
    - repoURL: https://github.com/hobroker/selfhosted.git
      targetRevision: HEAD
      ref: values`;

describe("parseApplication", () => {
  it("parses Pattern B (helm repo only, no config dir)", () => {
    const manifest = parseApplication(makeYaml({}), false);
    expect(manifest.name).toBe("myapp");
    expect(manifest.namespace).toBe("default");
    expect(manifest.pattern.kind).toBe("helm-repo");
    if (manifest.pattern.kind === "helm-repo") {
      expect(manifest.pattern.configPath).toBeUndefined();
      expect(manifest.pattern.helmSource.chart).toBe("app-template");
      expect(manifest.pattern.hasKustomization).toBe(false);
    }
  });

  it("parses Pattern A (helm repo + config dir)", () => {
    const manifest = parseApplication(
      makeYaml({ name: "backrest", sources: patternASources }),
      false,
    );
    expect(manifest.pattern.kind).toBe("helm-repo");
    if (manifest.pattern.kind === "helm-repo") {
      expect(manifest.pattern.configPath).toBe("apps/backup/backrest/config");
      expect(manifest.pattern.helmSource.chart).toBe("app-template");
    }
  });

  it("propagates hasKustomization flag", () => {
    const manifest = parseApplication(
      makeYaml({ name: "backrest", sources: patternASources }),
      true,
    );
    expect(manifest.pattern.kind).toBe("helm-repo");
    if (manifest.pattern.kind === "helm-repo") {
      expect(manifest.pattern.hasKustomization).toBe(true);
    }
  });

  it("parses Pattern C (git-based chart)", () => {
    const manifest = parseApplication(
      makeYaml({ name: "local-path-provisioner", namespace: "local-path-storage", sources: patternCSources }),
      false,
    );
    expect(manifest.pattern.kind).toBe("git-chart");
    if (manifest.pattern.kind === "git-chart") {
      expect(manifest.pattern.gitChartSource.repoURL).toBe(
        "https://github.com/rancher/local-path-provisioner.git",
      );
      expect(manifest.pattern.gitChartSource.targetRevision).toBe("v0.0.35");
      expect(manifest.pattern.gitChartSource.path).toBe("deploy/chart/local-path-provisioner");
    }
  });

  it("reads releaseName override from helm section", () => {
    const manifest = parseApplication(
      makeYaml({ name: "prometheus-operator", namespace: "monitoring", sources: releaseNameSources }),
      false,
    );
    expect(manifest.pattern.kind).toBe("helm-repo");
    if (manifest.pattern.kind === "helm-repo") {
      expect(manifest.pattern.helmSource.helm?.releaseName).toBe("prometheus-operator");
      expect(manifest.pattern.helmSource.chart).toBe("kube-prometheus-stack");
    }
  });

  it("throws on missing metadata.name", () => {
    const yaml = `
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  namespace: argocd
spec:
  sources: []
  destination:
    namespace: default
`;
    expect(() => parseApplication(yaml, false)).toThrow();
  });

  it("throws on invalid YAML", () => {
    expect(() => parseApplication("not: valid: yaml: :", false)).toThrow();
  });
});
