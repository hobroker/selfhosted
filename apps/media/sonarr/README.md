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
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install sonarr bjw-s/app-template -f values.yaml
```

## Storage

| source                     | container path | type       | description                             |
| -------------------------- | -------------- | ---------- | --------------------------------------- |
| `/var/local/sonarr`        | `/config`      | `hostPath` | Application configuration and database  |
| `192.168.50.7:/mnt/nebula` | `/mnt/nebula`  | `nfs`      | Full nebula share (TV Shows, Downloads) |

PV: `sonarr-config-pv` → PVC: `sonarr-config-pvc`
PV: `sonarr-nebula-pv` → PVC: `sonarr-nebula-pvc`
