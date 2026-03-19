---
description: A movie tracking and automation tool that downloads movies as they become available.
sourceCode: https://github.com/Radarr/Radarr
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                     | container path | type       | description                            |
| -------------------------- | -------------- | ---------- | -------------------------------------- |
| `/var/local/radarr`        | `/config`      | `hostPath` | Application configuration and database |
| `192.168.50.7:/mnt/nebula` | `/mnt/nebula`  | `nfs`      | Full nebula share (movies, downloads)  |

PV: `radarr-config-pv` → PVC: `radarr-config-pvc`
PV: `radarr-nebula-pv` → PVC: `radarr-nebula-pvc`
