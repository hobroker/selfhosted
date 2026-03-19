import { describe, expect, it, vi } from "vitest";
import { KNOWN_ALIASES, deriveHelmAlias, renderReadme } from "./render-readme";
import type { AppManifest, PartialReadme } from "./types";

const partial: PartialReadme = {
  frontmatter: {
    description: "A test app",
    sourceCode: "https://github.com/example/app",
    chart: "https://bjw-s-labs.github.io/helm-charts/docs/app-template/",
  },
  body: "## Storage\n\nsome storage info\n",
};

const partialNoChart: PartialReadme = {
  frontmatter: {
    description: "A test app",
    sourceCode: "https://github.com/example/app",
  },
  body: "",
};

const manifestHelmDefault: AppManifest = {
  name: "myapp",
  namespace: "default",
  pattern: {
    kind: "helm-repo",
    helmSource: {
      repoURL: "https://bjw-s-labs.github.io/helm-charts",
      chart: "app-template",
      targetRevision: "4.6.2",
    },
    configPath: "apps/backup/myapp/config",
    hasKustomization: false,
  },
};

const manifestHelmNonDefault: AppManifest = {
  name: "myapp",
  namespace: "monitoring",
  pattern: {
    kind: "helm-repo",
    helmSource: {
      repoURL: "https://bjw-s-labs.github.io/helm-charts",
      chart: "app-template",
    },
    hasKustomization: false,
  },
};

const manifestHelmKustomization: AppManifest = {
  ...manifestHelmDefault,
  pattern: {
    kind: "helm-repo",
    helmSource: {
      repoURL: "https://bjw-s-labs.github.io/helm-charts",
      chart: "app-template",
    },
    configPath: "apps/backup/myapp/config",
    hasKustomization: true,
  },
};

const manifestHelmNoConfig: AppManifest = {
  name: "myapp",
  namespace: "default",
  pattern: {
    kind: "helm-repo",
    helmSource: {
      repoURL: "https://bjw-s-labs.github.io/helm-charts",
      chart: "app-template",
    },
    hasKustomization: false,
  },
};

const manifestGitChart: AppManifest = {
  name: "local-path-provisioner",
  namespace: "local-path-storage",
  pattern: {
    kind: "git-chart",
    configPath: "apps/system/local-path-provisioner/config",
    gitChartSource: {
      repoURL: "https://github.com/rancher/local-path-provisioner.git",
      targetRevision: "v0.0.35",
      path: "deploy/chart/local-path-provisioner",
      helm: { valueFiles: [] },
    },
    hasKustomization: false,
  },
};

const manifestWithReleaseName: AppManifest = {
  name: "prometheus-operator",
  namespace: "monitoring",
  pattern: {
    kind: "helm-repo",
    helmSource: {
      repoURL: "https://prometheus-community.github.io/helm-charts",
      chart: "kube-prometheus-stack",
      helm: { releaseName: "prometheus-operator" },
    },
    hasKustomization: false,
  },
};

describe("deriveHelmAlias", () => {
  it("returns correct alias for all known URLs", () => {
    for (const [url, alias] of Object.entries(KNOWN_ALIASES)) {
      expect(deriveHelmAlias(url)).toBe(alias);
    }
  });

  it("normalizes trailing slash before lookup", () => {
    expect(deriveHelmAlias("https://bjw-s-labs.github.io/helm-charts/")).toBe("bjw-s");
  });

  it("falls back to last path segment stripped of -helm suffix", () => {
    const alias = deriveHelmAlias("https://example.github.io/my-helm");
    expect(alias).toBe("my");
  });

  it("warns when fallback is used", () => {
    const logger = { warn: vi.fn() } as any;
    deriveHelmAlias("https://unknown.example.com/charts", logger);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining("KNOWN_ALIASES"));
  });

  it("does not warn for known URLs", () => {
    const logger = { warn: vi.fn() } as any;
    deriveHelmAlias("https://bjw-s-labs.github.io/helm-charts", logger);
    expect(logger.warn).not.toHaveBeenCalled();
  });
});

describe("renderReadme", () => {
  it("includes Chart: line when chart is in frontmatter", () => {
    const output = renderReadme(partial, manifestHelmDefault, []);
    expect(output).toContain("Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/");
  });

  it("omits Chart: line when chart is absent from frontmatter", () => {
    const output = renderReadme(partialNoChart, manifestHelmDefault, []);
    expect(output).not.toContain("Chart:");
  });

  it("appends partial body after install section", () => {
    const output = renderReadme(partial, manifestHelmDefault);
    const installIdx = output.indexOf("## Installing/upgrading");
    const bodyIdx = output.indexOf("## Storage");
    expect(bodyIdx).toBeGreaterThan(installIdx);
  });

  it("renders storage section from partial body", () => {
    const output = renderReadme(partial, manifestHelmDefault);
    expect(output).toContain("## Storage");
    expect(output).toContain("some storage info");
  });

  it("omits storage section when partial body is empty", () => {
    const output = renderReadme(partialNoChart, manifestHelmDefault);
    expect(output).not.toContain("## Storage");
  });

  it("Pattern A: emits kubectl apply -f config when no kustomization", () => {
    const output = renderReadme(partial, manifestHelmDefault);
    expect(output).toContain("kubectl apply -f config");
    expect(output).not.toContain("kubectl apply -k config");
  });

  it("Pattern A: emits kubectl apply -k config when kustomization present", () => {
    const output = renderReadme(partial, manifestHelmKustomization);
    expect(output).toContain("kubectl apply -k config");
  });

  it("Pattern B: no kubectl apply when no config dir", () => {
    const output = renderReadme(partialNoChart, manifestHelmNoConfig);
    expect(output).not.toContain("kubectl apply -f config");
    expect(output).not.toContain("kubectl apply -k config");
  });

  it("no --namespace flag when namespace is default", () => {
    const output = renderReadme(partial, manifestHelmDefault);
    expect(output).not.toContain("--namespace");
  });

  it("includes --version flag from targetRevision", () => {
    const output = renderReadme(partial, manifestHelmDefault);
    expect(output).toContain("--version 4.6.2");
  });

  it("includes --namespace flag when namespace is non-default", () => {
    const output = renderReadme(partialNoChart, manifestHelmNonDefault);
    expect(output).toContain("--namespace monitoring --create-namespace");
  });

  it("uses releaseName override in helm command", () => {
    const output = renderReadme(partialNoChart, manifestWithReleaseName);
    expect(output).toContain(
      "helm upgrade --install prometheus-operator prometheus-community/kube-prometheus-stack",
    );
  });

  it("Pattern C: emits git clone and helm from path", () => {
    const output = renderReadme(partialNoChart, manifestGitChart);
    expect(output).toContain(
      "git clone --depth 1 --branch v0.0.35 https://github.com/rancher/local-path-provisioner.git /tmp/local-path-provisioner",
    );
    expect(output).toContain(
      "/tmp/local-path-provisioner/deploy/chart/local-path-provisioner",
    );
    expect(output).toContain("--namespace local-path-storage --create-namespace");
  });

  it("generates correct argocd sync command with app name", () => {
    const output = renderReadme(partial, manifestHelmDefault);
    expect(output).toContain("argocd app sync myapp");
  });
});
