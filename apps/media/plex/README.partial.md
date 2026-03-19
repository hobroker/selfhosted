---
description: A media server that organizes and streams video and audio content across devices.
sourceCode: https://www.plex.tv/
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                           | containerPath | description                            |
| -------------------------------- | ------------- | -------------------------------------- |
| `/var/local/plex` (hostPath)     | `/config`     | Application configuration and database |
| `192.168.50.7:/mnt/nebula` (NFS) | `/mnt/nebula` | Access to media library                |

PV: `plex-config-pv` → PVC: `plex-config-pvc`
PV: `plex-nebula-pv` → PVC: `plex-nebula-pvc`
