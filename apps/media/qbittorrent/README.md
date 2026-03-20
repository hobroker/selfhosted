# `qbittorrent`

> Bittorrent client with a feature rich Web UI for remote access

Source Code: https://github.com/qbittorrent/qBittorrent
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync qbittorrent
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -k config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install qbittorrent bjw-s/app-template -f values.yaml
```

## Storage

| source                     | container path        | type       | description                   |
| -------------------------- | --------------------- | ---------- | ----------------------------- |
| `/var/local/qbittorrent`   | `/config/qBittorrent` | `hostPath` | Application configuration     |
| `192.168.50.7:/mnt/nebula` | `/mnt/nebula`         | `nfs`      | Full nebula share (Downloads) |
