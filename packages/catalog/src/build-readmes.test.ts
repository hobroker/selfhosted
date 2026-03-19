import { describe, expect, it } from "vitest";
import { mkdtemp, readFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { buildReadmes } from "./build-readmes";
import { CatalogLogger } from "./logger";

async function setupFixture(
  root: string,
  category: string,
  service: string,
  partial: string,
  applicationYaml: string,
  withKustomization = false,
): Promise<void> {
  const appDir = join(root, "apps", category, service);
  await mkdir(join(appDir, "config"), { recursive: true });
  await writeFile(join(appDir, "README.partial.md"), partial);
  await writeFile(join(appDir, "application.yaml"), applicationYaml);
  if (withKustomization) {
    await writeFile(join(appDir, "config", "kustomization.yaml"), "resources: []");
  }
}

const BACKREST_PARTIAL = `---
description: A web-accessible backup solution built on top of restic
sourceCode: https://github.com/garethgeorge/backrest
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

Some storage info here.
`;

const BACKREST_YAML = `
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: backrest
  namespace: argocd
spec:
  sources:
    - repoURL: https://github.com/hobroker/selfhosted.git
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
      ref: values
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  syncPolicy:
    syncOptions:
      - CreateNamespace=true
`;

const CERTMANAGER_PARTIAL = `---
description: Automatically provision and manage TLS certificates in K8s
sourceCode: https://github.com/cert-manager/cert-manager
---
`;

const CERTMANAGER_YAML = `
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: cert-manager
  namespace: argocd
spec:
  sources:
    - repoURL: https://charts.jetstack.io
      chart: cert-manager
      targetRevision: v1.19.4
      helm:
        valueFiles:
          - $values/apps/system/cert-manager/values.yaml
    - repoURL: https://github.com/hobroker/selfhosted.git
      targetRevision: HEAD
      ref: values
  destination:
    server: https://kubernetes.default.svc
    namespace: cert-manager
  syncPolicy:
    syncOptions:
      - CreateNamespace=true
`;

describe("buildReadmes", () => {
  it("generates README.md from partial + application.yaml (Pattern A, default namespace)", async () => {
    const root = await mkdtemp(join(tmpdir(), "catalog-test-"));
    await setupFixture(root, "backup", "backrest", BACKREST_PARTIAL, BACKREST_YAML);

    const logger = new CatalogLogger();
    await buildReadmes({ root, check: false, dryRun: false }, logger);

    const readme = await readFile(join(root, "apps", "backup", "backrest", "README.md"), "utf-8");

    expect(readme).toContain("# `backrest`");
    expect(readme).toContain("> A web-accessible backup solution built on top of restic");
    expect(readme).toContain("Source Code: https://github.com/garethgeorge/backrest");
    expect(readme).toContain(
      "Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/",
    );
    expect(readme).toContain("## Installing/upgrading");
    expect(readme).toContain("argocd app sync backrest");
    expect(readme).toContain("kubectl apply -f config");
    expect(readme).toContain("helm upgrade --install backrest bjw-s/app-template");
    expect(readme).toContain("--version 4.6.2");
    expect(readme).not.toContain("--namespace");
    expect(readme).toContain("## Storage");
  });

  it("generates README.md with namespace flag (Pattern B, non-default namespace)", async () => {
    const root = await mkdtemp(join(tmpdir(), "catalog-test-"));
    await setupFixture(root, "system", "cert-manager", CERTMANAGER_PARTIAL, CERTMANAGER_YAML);

    const logger = new CatalogLogger();
    await buildReadmes({ root, check: false, dryRun: false }, logger);

    const readme = await readFile(
      join(root, "apps", "system", "cert-manager", "README.md"),
      "utf-8",
    );

    expect(readme).toContain("# `cert-manager`");
    expect(readme).toContain("--namespace cert-manager --create-namespace");
    expect(readme).not.toContain("kubectl apply -f config");
    expect(readme).not.toContain("kubectl apply -k config");
  });

  it("uses kubectl apply -k when kustomization.yaml is present", async () => {
    const root = await mkdtemp(join(tmpdir(), "catalog-test-"));
    await setupFixture(root, "backup", "backrest", BACKREST_PARTIAL, BACKREST_YAML, true);

    const logger = new CatalogLogger();
    await buildReadmes({ root, check: false, dryRun: false }, logger);

    const readme = await readFile(join(root, "apps", "backup", "backrest", "README.md"), "utf-8");
    expect(readme).toContain("kubectl apply -k config");
  });

  it("warns and skips app with no README.partial.md", async () => {
    const root = await mkdtemp(join(tmpdir(), "catalog-test-"));
    const appDir = join(root, "apps", "backup", "nopartial");
    await mkdir(appDir, { recursive: true });
    await writeFile(join(appDir, "application.yaml"), BACKREST_YAML);

    const logger = new CatalogLogger();
    const warns: string[] = [];
    logger.warn = (msg: string) => warns.push(msg);

    await buildReadmes({ root, check: false, dryRun: false }, logger);

    expect(warns.some((w) => w.includes("no README.partial.md"))).toBe(true);
    expect(logger.hasErrors()).toBe(false);
  });

  it("warns and skips app with no application.yaml", async () => {
    const root = await mkdtemp(join(tmpdir(), "catalog-test-"));
    const appDir = join(root, "apps", "backup", "noyaml");
    await mkdir(appDir, { recursive: true });
    await writeFile(join(appDir, "README.partial.md"), BACKREST_PARTIAL);

    const logger = new CatalogLogger();
    const warns: string[] = [];
    logger.warn = (msg: string) => warns.push(msg);

    await buildReadmes({ root, check: false, dryRun: false }, logger);

    expect(warns.some((w) => w.includes("no application.yaml"))).toBe(true);
    expect(logger.hasErrors()).toBe(false);
  });

  it("--check mode: reports error when README.md is out of date", async () => {
    const root = await mkdtemp(join(tmpdir(), "catalog-test-"));
    await setupFixture(root, "backup", "backrest", BACKREST_PARTIAL, BACKREST_YAML);

    // Write stale content
    await writeFile(
      join(root, "apps", "backup", "backrest", "README.md"),
      "stale content",
    );

    const logger = new CatalogLogger();
    await buildReadmes({ root, check: true, dryRun: false }, logger);

    expect(logger.hasErrors()).toBe(true);
  });

  it("--check mode: no error when README.md is up to date", async () => {
    const root = await mkdtemp(join(tmpdir(), "catalog-test-"));
    await setupFixture(root, "backup", "backrest", BACKREST_PARTIAL, BACKREST_YAML);

    // Generate first
    const logger1 = new CatalogLogger();
    await buildReadmes({ root, check: false, dryRun: false }, logger1);

    // Check mode — should be clean
    const logger2 = new CatalogLogger();
    await buildReadmes({ root, check: true, dryRun: false }, logger2);

    expect(logger2.hasErrors()).toBe(false);
  });
});
