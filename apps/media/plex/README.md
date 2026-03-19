# `plex`

> A media server that organizes and streams video and audio content across devices.

Source Code: https://www.plex.tv/
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync plex
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install plex bjw-s/app-template \
  --version 4.6.2 -f values.yaml
```

## Storage

| source                     | container path | type       | description                            |
| -------------------------- | -------------- | ---------- | -------------------------------------- |
| `/var/local/plex`          | `/config`      | `hostPath` | Application configuration and database |
| `192.168.50.7:/mnt/nebula` | `/mnt/nebula`  | `nfs`      | Access to media library                |

PV: `plex-config-pv` → PVC: `plex-config-pvc`
PV: `plex-nebula-pv` → PVC: `plex-nebula-pvc`
