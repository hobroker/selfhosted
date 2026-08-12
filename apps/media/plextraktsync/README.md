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

The Plex server URL is set via `PLEX_BASEURL` in `values.yaml` (defaults to the
in-cluster Plex service at `http://plex:32400`). `PLEX_TOKEN` alone is not enough —
PlexTraktSync needs to know which server to connect to.

### First-run bootstrap

PlexTraktSync is designed around a one-time interactive `plextraktsync login`, which
persists `servers.yml`, `.env`, and `.pytrakt.json` (including the completed Trakt
OAuth) into `/app/config`. Run it once before relying on the hourly `sync` cronjob.

**Option A — locally with Docker, then seed the PV.** Generate the config on a machine
with a browser (Trakt uses a device-code flow):

```sh
mkdir -p ./plextraktsync-config

docker run -it --rm \
  -v "$(pwd)/plextraktsync-config:/app/config" \
  ghcr.io/taxel/plextraktsync:0.32.0 \
  login
```

The wizard walks through Trakt (prints a `trakt.tv/activate` URL) and Plex (credentials,
2FA if enabled, then server selection). It writes `.env`, `servers.yml`,
`.pytrakt.json`, and `config.yml` into `./plextraktsync-config/`. Copy that onto the
node hosting the PV:

```sh
rsync -a ./plextraktsync-config/ <node>:/var/local/plextraktsync/
```

**Option B — in-cluster against the PVC:**

```sh
kubectl run plextraktsync-login -n default --rm -it --restart=Never \
  --image=ghcr.io/taxel/plextraktsync:0.32.0 \
  --overrides='{"spec":{"volumes":[{"name":"config","persistentVolumeClaim":{"claimName":"plextraktsync-config-pvc"}}],"containers":[{"name":"login","image":"ghcr.io/taxel/plextraktsync:0.32.0","stdin":true,"tty":true,"args":["login"],"volumeMounts":[{"name":"config","mountPath":"/app/config"}]}]}}'
```

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
