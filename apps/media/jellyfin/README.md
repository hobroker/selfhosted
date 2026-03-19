# `jellyfin`

> An open-source media server

Source Code: https://github.com/jellyfin/jellyfin
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync jellyfin
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install jellyfin bjw-s/app-template -f values.yaml
```

## Storage

| source                           | containerPath | description                            |
| -------------------------------- | ------------- | -------------------------------------- |
| `/var/local/jellyfin` (hostPath) | `/config`     | Application configuration and database |
| `192.168.50.7:/mnt/nebula` (NFS) | `/mnt/nebula` | Media library                          |

PV: `jellyfin-config-pv` → PVC: `jellyfin-config-pvc`
PV: `jellyfin-nebula-pv` → PVC: `jellyfin-nebula-pvc`
