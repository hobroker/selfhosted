# `recyclarr`

> Automatically sync TRaSH Guide settings to Radarr and Sonarr.

Source Code: https://github.com/recyclarr/recyclarr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync recyclarr
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -k config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install recyclarr bjw-s/app-template -f values.yaml
```

## Configuration

Edit `config/recyclarr.yml` to customize quality profiles, custom formats, and scoring for Radarr and Sonarr. See the [Recyclarr config reference](https://recyclarr.dev/wiki/yaml/config-reference/) for all available options.

ArgoCD will automatically run a sync job whenever this file changes.

### Adding or updating quality profiles / custom formats

All custom format `trash_id` values come from the [TRaSH Guides JSON files](https://github.com/TRaSH-Guides/Guides/tree/master/docs/json). Browse by service:

- **Radarr CFs** — `docs/json/radarr/cf/*.json`
- **Sonarr CFs** — `docs/json/sonarr/cf/*.json`
- **Pre-built profile groups** — `docs/json/radarr/cf-groups/` and `docs/json/sonarr/cf-groups/`

Each JSON file contains a `trash_id` field and a `name` field — use the `trash_id` in `recyclarr.yml`.

Useful starting points on the TRaSH Guides website:

| Goal                                        | URL                                                                   |
| ------------------------------------------- | --------------------------------------------------------------------- |
| Radarr quality profiles (HD, UHD, Remux…)   | https://trash-guides.info/Radarr/radarr-setup-quality-profiles/       |
| Sonarr quality profiles (WEB, Anime…)       | https://trash-guides.info/Sonarr/sonarr-setup-quality-profiles/       |
| All Radarr custom formats with explanations | https://trash-guides.info/Radarr/Radarr-collection-of-custom-formats/ |
| All Sonarr custom formats with explanations | https://trash-guides.info/Sonarr/sonarr-collection-of-custom-formats/ |

> **Note:** CF names and `trash_id` values do change between TRaSH Guide releases. Always verify IDs against the JSON source above before adding them — recyclarr will warn about invalid IDs on the next sync.

## Storage

| source                 | container path | type       | description            |
| ---------------------- | -------------- | ---------- | ---------------------- |
| `/var/local/recyclarr` | `/config`      | `hostPath` | State, logs, and cache |

### Secrets

The following environment variables are required and sourced from the `infisical-recyclarr-secret`:

| name             | description        |
| ---------------- | ------------------ |
| `SONARR_API_KEY` | API key for Sonarr |
| `RADARR_API_KEY` | API key for Radarr |
