---
description: Bittorrent client with a feature rich Web UI for remote access
sourceCode: https://github.com/qbittorrent/qBittorrent
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                              | containerPath         | description                        |
| ----------------------------------- | --------------------- | ---------------------------------- |
| `/var/local/qbittorrent` (hostPath) | `/config/qBittorrent` | Application configuration          |
| `192.168.50.7:/mnt/nebula` (NFS)    | `/mnt/nebula`         | Full nebula share (downloads, etc) |

PV: `qbittorrent-config-pv` (1Gi, Retain) → PVC: `qbittorrent-config-pvc`
PV: `qbittorrent-nebula-pv` (NFS, Retain) → PVC: `qbittorrent-nebula-pvc`
