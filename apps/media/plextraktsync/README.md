# `plextraktsync`

> Sync Plex watch history and ratings to Trakt.

Source Code: https://github.com/Taxel/PlexTraktSync
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync plextraktsync
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -k config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install plextraktsync bjw-s/app-template -f values.yaml
```

## Configuration

The cronjob runs every hour and syncs Plex watch history and ratings to Trakt.

## Storage

| source                     | container path | type       | description      |
| -------------------------- | -------------- | ---------- | ---------------- |
| `/var/local/plextraktsync` | `/app/config`  | `hostPath` | Config and cache |

### Secrets

The following environment variables are required and sourced from the `infisical-plextraktsync-secret`:

| name                  | description               |
| --------------------- | ------------------------- |
| `PLEX_TOKEN`          | Plex authentication token |
| `TRAKT_CLIENT_ID`     | Trakt API client ID       |
| `TRAKT_CLIENT_SECRET` | Trakt API client secret   |
