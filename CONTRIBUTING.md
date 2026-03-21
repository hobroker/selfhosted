# Contributing

## Project Structure

```
apps/
  <category>/
    <app>/
      application.yaml  # ArgoCD Application manifest
      values.yaml       # Helm values overrides
      README.md         # Install instructions, secrets, host volumes
packages/
  catalog/              # Generates README.md and main README.md from app READMEs
```

## Adding a new App

### 1. Create the app directory

```
apps/<category>/<app-name>/
```

Use an existing category (`automation`, `backup`, `development`, `media`, `monitoring`, `network`, `system`) or add a new one.

### 2. Add the required files

**`application.yaml`** — ArgoCD Application manifest:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: <app-name>
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
  labels:
    category: <category>
spec:
  project: default
  sources:
    - repoURL: https://bjw-s-labs.github.io/helm-charts
      chart: app-template
      targetRevision: <version>
      helm:
        valueFiles:
          - $values/apps/<category>/<app-name>/values.yaml
    - repoURL: https://github.com/hobroker/selfhosted.git
      targetRevision: HEAD
      ref: values
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  syncPolicy: {}
```

**`values.yaml`** — your Helm values overrides.

**`README.md`** — must follow the format below exactly, as it is parsed by the doc generator.

### 3. App README format

The doc generator reads three fields from each app's `README.md`:

```markdown
# `<app-name>`

> <one-line description>

Source Code: <url>
```

- **Line 1** — name in backticks, must match the directory name exactly
- **Line 2** — description starting with `> `
- **`Source Code:`** — a line with this exact prefix followed by the upstream URL

The rest of the README is free-form. Use it to document install steps, required secrets, and host volumes. See any existing app for reference.

### 4. Update the main README

The `Apps` tables in `README.md` are auto-generated. After editing an app's `README.md`, regenerate them with:

```shell
npm run generate
```

This also runs automatically as a pre-commit hook whenever a `apps/**/README.md` is staged.

## Opening a Pull Request

1. Fork the repo and clone your fork
2. Create a branch from `master`
3. Make your changes
4. Run `npm run lint` and `npm run format` to ensure consistent style
5. Push your branch and open a PR targeting `master`

## Keeping Docs in Sync

If you change the app README format, categories, or PR process in this file, also update `CLAUDE.md` — it duplicates some of this information for AI assistant context.
