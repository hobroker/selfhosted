---
description: Bittorrent client with a feature rich Web UI for remote access
sourceCode: https://github.com/qbittorrent/qBittorrent
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                     | container path        | type       | description                        |
| -------------------------- | --------------------- | ---------- | ---------------------------------- |
| `/var/local/qbittorrent`   | `/config/qBittorrent` | `hostPath` | Application configuration          |
| `192.168.50.7:/mnt/nebula` | `/mnt/nebula`         | `nfs`      | Full nebula share (downloads, etc) |

PV: `qbittorrent-config-pv` (1Gi, Retain) → PVC: `qbittorrent-config-pvc`
PV: `qbittorrent-nebula-pv` (NFS, Retain) → PVC: `qbittorrent-nebula-pvc`
