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
kubectl apply -f config/pv.yaml
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install qbittorrent bjw-s/app-template \
  --version 4.6.2 --namespace default --create-namespace \
  -f values.yaml
```

## Storage

| source                                                       | containerPath         | description                           |
| ------------------------------------------------------------ | --------------------- | ------------------------------------- |
| `/var/local/qbittorrent` (hostPath)                          | `/config/qBittorrent` | Application configuration             |
| `192.168.50.7:/mnt/nebula/downloads` (NFS)                   | `/downloads`          | Main downloads directory              |
| `192.168.50.7:/mnt/nebula/downloads/blackhole` (NFS subPath) | `/blackhole`          | Blackhole directory for torrent files |

PV: `qbittorrent-config-pv` (1Gi, Retain) → PVC: `qbittorrent-config-pvc`
PV: `qbittorrent-downloads-pv` (NFS, Retain) → PVC: `qbittorrent-downloads-pvc`
