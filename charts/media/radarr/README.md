# `radarr`

> A movie tracking and automation tool that downloads movies as they become available.

Source Code: https://github.com/Radarr/Radarr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync radarr
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config/pv.yaml
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install radarr bjw-s/app-template \
  --namespace default --create-namespace \
  -f values.yaml
```

### Secrets

| name                        | description                                |
| --------------------------- | ------------------------------------------ |
| `infisical-scraparr-secret` | (Used by scraparr) Contains Radarr API key |

## Storage

| source                                     | containerPath        | description                            |
| ------------------------------------------ | -------------------- | -------------------------------------- |
| `/var/local/radarr` (hostPath)             | `/config`            | Application configuration and database |
| `192.168.50.7:/mnt/nebula/movies` (NFS)    | `/mnt/nebula/movies` | Movie library directory                |
| `192.168.50.7:/mnt/nebula/downloads` (NFS) | `/downloads`         | Downloads directory for processing     |

PV: `radarr-config-pv` → PVC: `radarr-config-pvc`
PV: `radarr-movies-pv` → PVC: `radarr-movies-pvc`
PV: `radarr-downloads-pv` → PVC: `radarr-downloads-pvc`
