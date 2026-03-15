# Contributing

## Project Structure

```
apps/
  <category>/
    <service>/
      application.yaml  # ArgoCD Application manifest
      values.yaml       # Helm values overrides
      README.md         # Install instructions, secrets, host volumes
packages/
  cli/                  # Interactive terminal UI (Ink/React)
  docs/                 # README table generator
```

## Adding a new App

### 1. Create the app directory

```
apps/<category>/<service-name>/
```

Use an existing category (`automation`, `development`, `downloads`, `media`, `monitoring`, `system`) or add a new one.

### 2. Add the required files

**`application.yaml`** — ArgoCD Application manifest:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: <service-name>
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
          - $values/apps/<category>/<service-name>/values.yaml
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
# `<service-name>`

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

## Development

Install dependencies:

```shell
npm install
```

Run the interactive CLI:

```shell
npm run cli
```

Lint and format:

```shell
npm run lint
npm run format
```

## Opening a Pull Request

1. Fork the repo and clone your fork
2. Create a branch from `master`
3. Make your changes
4. Run `npm run lint` and `npm run format` to ensure consistent style
5. Push your branch and open a PR targeting `master`
