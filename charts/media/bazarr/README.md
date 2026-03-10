# `bazarr`

> Companion application to Sonarr and Radarr that manages and downloads subtitles.

Source Code: https://github.com/morpheus65535/bazarr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync bazarr
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config/pv.yaml
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install bazarr bjw-s/app-template \
  --namespace default --create-namespace \
  -f values.yaml
```

## Storage

| source                           | containerPath | description                                     |
| -------------------------------- | ------------- | ----------------------------------------------- |
| `/var/local/bazarr` (hostPath)   | `/config`     | Application configuration and database          |
| `192.168.50.7:/mnt/nebula` (NFS) | `/mnt/nebula` | Access to media library for subtitle management |

PV: `bazarr-config-pv` → PVC: `bazarr-config-pvc`
PV: `bazarr-nebula-pv` → PVC: `bazarr-nebula-pvc`
