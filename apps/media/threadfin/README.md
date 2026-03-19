# `threadfin`

> An M3U proxy for Kernel/Plex/Jellyfin/Emby based on xTeVe

Source Code: https://github.com/Threadfin/Threadfin
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync threadfin
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install threadfin bjw-s/app-template \
  --version 4.6.2 -f values.yaml
```

## Storage

| source                 | container path         | type       | description               |
| ---------------------- | ---------------------- | ---------- | ------------------------- |
| `/var/local/threadfin` | `/home/threadfin/conf` | `hostPath` | Application configuration |
| —                      | `/tmp/threadfin`       | `emptyDir` | Temporary files           |

PV: `threadfin-config-pv` → PVC: `threadfin-config-pvc`
