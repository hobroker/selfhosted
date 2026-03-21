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

```text
apps/
  <category>/        # automation, backup, development, media, monitoring, network, system
    <app-name>/
      application.yaml   # ArgoCD Application manifest
      values.yaml        # Helm values overrides (bjw-s-labs/app-template chart)
      README.md          # parsed by doc generator — must follow strict format
      config/
        pv.yaml                        # PersistentVolume (hostPath)
        infisical-<app>-secret.yaml    # secret reference via Infisical operator
packages/
  catalog/            # TypeScript CLI that generates the apps table in README.md
.github/workflows/
  ci.yml             # lint + typecheck + test + kubeconform manifest validation
  docs.yml           # checks npm run generate is up-to-date
```

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
- **ArgoCD sync**: `syncPolicy: {}` means manual sync by default. System apps use sync-waves for ordering.
- **Auto-generated content**: The `## Apps` section in `README.md` is auto-generated. Never edit it manually — always run `npm run generate`.

## Gotchas

- **Never edit the `## Apps` table in `README.md` directly** — it is auto-generated. Run `npm run generate` instead, or let the pre-commit hook do it.
- **App README name must match directory name exactly** — the name in backticks on line 1 must equal the folder name or the catalog generator will log an error and may produce incorrect output.
- **ArgoCD sync is manual by default** — no `automated:` block in `syncPolicy` means pushing changes does not auto-deploy. See ArgoCD Workflow section below.
- **Secrets must exist in Infisical before deploying** — deploying an app before its Infisical secret is created will cause CrashLoopBackOff.

## ArgoCD Workflow

1. Edit `values.yaml` (or `application.yaml`) and commit/push
2. ArgoCD detects the change but does **not** auto-sync (`syncPolicy: {}` by default)
3. Sync manually: ArgoCD UI → app → Sync, or: `argocd app sync <app-name>`
4. To watch rollout: `kubectl rollout status deploy/<app> -n default`

System apps (argocd, traefik, cert-manager, metallb) use sync-waves and should be deployed first.

## Secrets (Infisical)

Secrets are injected via the [Infisical operator](https://infisical.com/docs/integrations/platforms/kubernetes). Each app gets an `InfisicalSecret` CRD in `apps/<cat>/<app>/config/infisical-<app>-secret.yaml` that maps Infisical project secrets to a Kubernetes Secret.

The Kubernetes Secret name is referenced in `values.yaml` under `controllers.main.containers.main.env[].valueFrom.secretKeyRef`.

Before deploying a new app:

1. Add the required secrets to Infisical (project: selfhosted)
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
4. Run `npm run lint` and `npm run format` before committing
5. See `CONTRIBUTING.md` for full details and the `application.yaml` template

## CI

CI runs on every PR:

- ESLint + Prettier check
- TypeScript type-check
- Vitest tests
- Kubeconform validates all YAML manifests against Kubernetes OpenAPI schemas
