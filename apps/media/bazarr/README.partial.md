---
description: Companion application to Sonarr and Radarr that manages and downloads subtitles.
sourceCode: https://github.com/morpheus65535/bazarr
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                           | containerPath | description                                     |
| -------------------------------- | ------------- | ----------------------------------------------- |
| `/var/local/bazarr` (hostPath)   | `/config`     | Application configuration and database          |
| `192.168.50.7:/mnt/nebula` (NFS) | `/mnt/nebula` | Access to media library for subtitle management |

PV: `bazarr-config-pv` → PVC: `bazarr-config-pvc`
PV: `bazarr-nebula-pv` → PVC: `bazarr-nebula-pvc`
