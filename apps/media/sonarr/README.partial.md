---
description: A TV series tracking and automation tool for downloading episodes as they air.
sourceCode: https://github.com/Sonarr/Sonarr
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                           | containerPath | description                            |
| -------------------------------- | ------------- | -------------------------------------- |
| `/var/local/sonarr` (hostPath)   | `/config`     | Application configuration and database |
| `192.168.50.7:/mnt/nebula` (NFS) | `/mnt/nebula` | Full nebula share (tvshows, downloads) |

PV: `sonarr-config-pv` → PVC: `sonarr-config-pvc`
PV: `sonarr-nebula-pv` → PVC: `sonarr-nebula-pvc`
