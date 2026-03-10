# `sonarr`

> A TV series tracking and automation tool for downloading episodes as they air.

Source Code: https://github.com/Sonarr/Sonarr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync sonarr
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config/pv.yaml
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install sonarr bjw-s/app-template \
  --namespace default --create-namespace \
  -f values.yaml
```

### Secrets

| name                        | description                                |
| --------------------------- | ------------------------------------------ |
| `infisical-scraparr-secret` | (Used by scraparr) Contains Sonarr API key |

## Storage

| source                                     | containerPath     | description                            |
| ------------------------------------------ | ----------------- | -------------------------------------- |
| `/var/local/sonarr` (hostPath)             | `/config`         | Application configuration and database |
| `192.168.50.7:/mnt/nebula/tvshows` (NFS)   | `/nebula/tvshows` | TV series library directory            |
| `192.168.50.7:/mnt/nebula/downloads` (NFS) | `/downloads`      | Downloads directory for processing     |

PV: `sonarr-config-pv` → PVC: `sonarr-config-pvc`
PV: `sonarr-tvshows-pv` → PVC: `sonarr-tvshows-pvc`
PV: `sonarr-downloads-pv` → PVC: `sonarr-downloads-pvc`
