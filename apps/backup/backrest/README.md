# `backrest`

> A web-accessible backup solution built on top of restic

Source Code: https://github.com/garethgeorge/backrest
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Prerequisites

Create the directory on the Talos node before deploying:

```bash
# Via a privileged pod or copy-helper
mkdir -p /var/local/backrest/data
```

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
  --namespace default --create-namespace \
  -f values.yaml
```

## Storage

| hostPath                              | containerPath | description                           |
| ------------------------------------- | ------------- | ------------------------------------- |
| `/var/local/backrest/data` (hostPath) | `/data`       | Backrest config, repos index and logs |
| `/var/local` (hostPath)               | `/var/local`  | Backrest varlocal data                |

PV: `backrest-data-pv` (Retain) → PVC: `backrest-data-pvc`
PV: `backrest-varlocal-pv` (Retain) → PVC: `backrest-varlocal-pvc`
