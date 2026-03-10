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
kubectl apply -f config/pv.yaml
helmfile apply
```

## Storage

| hostPath                   | containerPath | description                           |
| -------------------------- | ------------- | ------------------------------------- |
| `/var/local/backrest/data` | `/data`       | Backrest config, repos index and logs |

PV: `backrest-data-pv` (5Gi, Retain) → PVC: `backrest-data-pvc` in namespace `default`
