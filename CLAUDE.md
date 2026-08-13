# CLAUDE.md

This is a Kubernetes homelab monorepo. Apps are deployed via Helm + ArgoCD (GitOps). The TypeScript tooling lives in `packages/catalog` and generates documentation.

## Commands

```shell
npm install          # install dependencies
npm run lint         # run ESLint across all packages
npm run lint:fix     # auto-fix lint issues
npm run format       # run Prettier on all files
npm run format:check # check formatting without writing
npm run typecheck    # TypeScript type-check all packages
npm run test         # run Vitest unit tests
npm run generate     # regenerate the apps table in README.md
npm run generate -- --check  # verify README is up-to-date (used in CI)
```

## Repo Structure

- `apps/<category>/<app>/` — one dir per app: `application.yaml` (ArgoCD), `values.yaml` (Helm), `README.md` (doc-generator input), optional `config/` (PVs, Infisical secrets, kustomization).
- `bootstrap/system.yaml` — root app-of-apps that deploys the `apps/system` apps in sync-wave order.
- `packages/catalog/` — TypeScript CLI that generates the apps table in `README.md`.
- `.github/workflows/` — `ci.yml` (lint/typecheck/test/kubeconform), `docs.yml` (README up-to-date check).

See `CONTRIBUTING.md` § "Project Structure" for the full tree and the list of categories.

## App README Format

Each app README requires three fields in its header (the rest is free-form):

1. App name in backticks (`` # `<app-name>` ``)
2. One-line description prefixed with `> `
3. A `Source Code:` line with the upstream URL

See `CONTRIBUTING.md` § "App README format" for the exact spec.

**Key rule:** the name in backticks must match the directory name exactly,
or `npm run generate` will log an error and may produce incorrect output.

## Key Conventions

- **Chart**: All apps use `bjw-s-labs/app-template` Helm chart. Don't reinvent custom charts.
- **Secrets**: Injected via [Infisical operator](https://infisical.com/docs/integrations/platforms/kubernetes). Each app has an `infisical-<app>-secret.yaml` in `config/`.
- **Storage**: Default host paths are `/var/local/<app>` (config/db) and `/mnt/nebula` (media/NAS). StorageClass uses `Retain` reclaim policy.
- **Ingress**: All apps use Traefik. Domain pattern: `<app>.hobroker.me`.
- **ArgoCD sync**: workload apps are manual-sync (`syncPolicy: {}`) by default. System apps set `syncPolicy.automated` and are deployed in sync-wave order by the root app-of-apps (`bootstrap/system.yaml`).
- **Auto-generated content**: The `## Apps` section in `README.md` is auto-generated. Never edit it manually — always run `npm run generate`.

## Gotchas

- **Never edit the `## Apps` table in `README.md` directly** — it is auto-generated. Run `npm run generate` instead, or let the pre-commit hook do it.
- **App README name must match directory name exactly** — the name in backticks on line 1 must equal the folder name or the catalog generator will log an error and may produce incorrect output.
- **ArgoCD sync is manual by default** — sync is manual unless `syncPolicy.automated` is present; `syncOptions` (`CreateNamespace`, `ServerSideApply`) don't change that. System apps are the exception: they set `automated` and are ordered by the root app-of-apps (`bootstrap/system.yaml`). See the ArgoCD Workflow section below, and `CONTRIBUTING.md` § "Adding a new App" for how `syncOptions` relate to sync mode.
- **Secrets must exist in Infisical before deploying** — deploying an app before its Infisical secret is created will cause CrashLoopBackOff.

## ArgoCD Workflow

1. Edit `values.yaml` (or `application.yaml`) and commit/push
2. ArgoCD detects the change but does **not** auto-sync (`syncPolicy: {}` by default)
3. Sync manually: ArgoCD UI → app → Sync, or: `argocd app sync <app-name>`
4. To watch rollout: `kubectl rollout status deploy/<app> -n default`

System apps (metallb, longhorn, traefik, infisical-operator, reloader) auto-sync in sync-wave order via the root app-of-apps (`bootstrap/system.yaml`) and come up before workload apps. Apply it once after bootstrapping ArgoCD: `kubectl apply -f bootstrap/system.yaml`. (argocd and rancher are excluded — deployed manually.)

## Secrets (Infisical)

Secrets are injected via the [Infisical operator](https://infisical.com/docs/integrations/platforms/kubernetes). Each app gets an `InfisicalSecret` CRD in `apps/<cat>/<app>/config/infisical-<app>-secret.yaml` that maps Infisical project secrets to a Kubernetes Secret.

The Kubernetes Secret name is referenced in `values.yaml` under `controllers.main.containers.main.env[].valueFrom.secretKeyRef`.

Before deploying a new app:

1. Add the required secrets to Infisical (project slug `kira`, env `prod`) under the `/<app>` path
2. Create `config/infisical-<app>-secret.yaml`
3. Apply it: `kubectl apply -f apps/<cat>/<app>/config/infisical-<app>-secret.yaml`

## kubectl Quick Reference

```shell
kubectl get pods -A                      # all pods, all namespaces
kubectl get pods -n default              # app pods
kubectl logs -n default <pod>            # pod logs
kubectl describe pod -n default <pod>    # events + config
kubectl apply -f apps/<cat>/<app>/application.yaml  # deploy an app
kubectl get ingress -A                   # check Traefik routes
kubectl get secret -n default            # list secrets
```

## Adding a New App

1. Create `apps/<category>/<app-name>/` with `application.yaml`, `values.yaml`, and `README.md` (add `config/` if the app needs extra manifests like PVs or Infisical secrets)
2. Follow the README format above exactly
3. Run `npm run generate` to update the main README (or let the pre-commit hook do it)
4. Before committing, run the same checks as CI: `npm run lint`, `npm run format`, `npm run typecheck`, `npm run test`, `npm run generate -- --check`
5. See `CONTRIBUTING.md` for full details and the file templates

## CI

CI runs on every PR:

- ESLint + Prettier check
- TypeScript type-check
- Vitest tests
- Kubeconform validates all YAML manifests against Kubernetes OpenAPI schemas

Separately, a **Semantic PR** status check requires the **PR title** to be a
conventional-commit summary (e.g. `feat(<app>): add <app>`, `fix(<app>): …`,
`chore(<app>): …`). It is enforced on the title only (`.github/semantic.yml`),
not on individual commits — a non-conventional title fails the check.
