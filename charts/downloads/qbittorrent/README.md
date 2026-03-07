# `qbittorrent`

> Bittorrent client with a feature rich Web UI for remote access

Source Code: https://github.com/qbittorrent/qBittorrent
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register
kubectl apply -f application.yaml

# Upgrade - via ArgoCD UI or:
argocd app sync qbittorrent
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install qbittorrent bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Host Volumes

| hostPath                          | containerPath         | description                           |
| --------------------------------- | --------------------- | ------------------------------------- |
| `/appdata/k3s/qbittorrent`        | `/config/qBittorrent` | Application configuration             |
| `/mnt/nebula/downloads/blackhole` | `/blackhole`          | Blackhole directory for torrent files |
| `/mnt/nebula/downloads`           | `/downloads`          | Main downloads directory              |
