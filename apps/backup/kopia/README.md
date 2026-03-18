# `kopia`

> Fast and secure backup tool with deduplication, compression, and cloud storage support

Source Code: https://github.com/kopia/kopia
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Prerequisites

Create directories on the Talos node before deploying:

```bash
mkdir -p /var/local/kopia/config /var/local/kopia/cache /var/local/kopia/logs
```

## Secrets

Set `KOPIA_UI_PASSWORD` and `KOPIA_PASSWORD` in `values.yaml` before deploying:

- `KOPIA_UI_PASSWORD` — web UI login password (username: `admin`)
- `KOPIA_PASSWORD` — repository encryption password

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync kopia
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config/pv.yaml
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install kopia bjw-s/app-template \
  --namespace default --create-namespace \
  -f values.yaml
```

## Storage

| hostPath                  | containerPath | description             |
| ------------------------- | ------------- | ----------------------- |
| `/var/local/kopia/config` | `/app/config` | Kopia config + TLS cert |
| `/var/local/kopia/cache`  | `/app/cache`  | Local dedup cache       |
| `/var/local/kopia/logs`   | `/app/logs`   | Server logs             |

PV: `kopia-config-pv` → PVC: `kopia-config-pvc`
PV: `kopia-cache-pv` → PVC: `kopia-cache-pvc`
PV: `kopia-logs-pv` → PVC: `kopia-logs-pvc`

Repository backend: configured via UI after deploy (S3, B2, GCS, etc.)

## VolSync Integration

Kopia runs in server mode with a self-signed TLS cert. VolSync can connect via the ClusterIP service:

```
kopia.default.svc.cluster.local:51515
```

Get the cert fingerprint after deploy:

```bash
kubectl exec -n default deploy/kopia -- kopia server status
```
