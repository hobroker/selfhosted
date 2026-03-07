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
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install threadfin bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Host Volumes

| hostPath                      | containerPath          | description               |
| ----------------------------- | ---------------------- | ------------------------- |
| `/appdata/k3s/threadfin/conf` | `/home/threadfin/conf` | Application configuration |
| `/appdata/k3s/threadfin/temp` | `/tmp/threadfin`       | Temporary files directory |
