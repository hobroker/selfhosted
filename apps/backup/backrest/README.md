# `backrest`

> A web-accessible backup solution built on top of restic

Source Code: https://github.com/garethgeorge/backrest
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync backrest
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install backrest bjw-s/app-template \
  --version 4.6.2 -f values.yaml
```

## Storage

| Name       | Source                     | Container Path | Size |
| ---------- | -------------------------- | -------------- | ---- |
| `data`     | `/var/local/backrest/data` | `/data`        | 5Gi  |
| `varlocal` | `/var/local`               | `/var/local`   | 1Ti  |

## Prerequisites

Create the directory on the Talos node before deploying:

```bash
# Via a privileged pod or copy-helper
mkdir -p /var/local/backrest/data
```
