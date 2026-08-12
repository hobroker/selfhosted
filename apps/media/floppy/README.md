# `floppy`

> Self-hosted all-in-one media tracker and Trakt alternative.

Source Code: https://github.com/dannyvfilms/Floppy
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync floppy
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -k config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install floppy bjw-s/app-template -f values.yaml
```

## Configuration

Floppy is a Django app served on port `8000` and reached at
`https://floppy.hobroker.me` through Traefik. It requires a Redis instance, which
runs as a `redis` sidecar container in the same pod (`REDIS_URL=redis://localhost:6379`).
The Redis data lives on an `emptyDir` and is treated as an ephemeral cache/session
store — a pod restart just means re-logging in and re-running background metadata jobs.

Metadata providers use `TMDB_API` (themoviedb.org) and `TVDB_API_KEY` (thetvdb.com).

### Creating the first account

`REGISTRATION` is set to `"true"` in `values.yaml` so you can create your account on
first launch. **Set it to `"false"` and re-sync once your account exists** to close
public signups, since the ingress is internet-facing.

## Storage

| source              | container path | type       | description                                 |
| ------------------- | -------------- | ---------- | ------------------------------------------- |
| `/var/local/floppy` | `/floppy/db`   | `hostPath` | SQLite database                             |
| —                   | `/data`        | `emptyDir` | Redis cache/session store (redis container) |

### Secrets

The following environment variables are required and sourced from the `infisical-floppy-secret`:

| name           | description                   |
| -------------- | ----------------------------- |
| `SECRET`       | Django secret key             |
| `TMDB_API`     | TMDB (themoviedb.org) API key |
| `TVDB_API_KEY` | TVDB (thetvdb.com) API key    |
