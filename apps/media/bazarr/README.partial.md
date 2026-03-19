---
description: Companion application to Sonarr and Radarr that manages and downloads subtitles.
sourceCode: https://github.com/morpheus65535/bazarr
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                     | container path | type       | description                                     |
| -------------------------- | -------------- | ---------- | ----------------------------------------------- |
| `/var/local/bazarr`        | `/config`      | `hostPath` | Application configuration and database          |
| `192.168.50.7:/mnt/nebula` | `/mnt/nebula`  | `nfs`      | Access to media library for subtitle management |

PV: `bazarr-config-pv` → PVC: `bazarr-config-pvc`
PV: `bazarr-nebula-pv` → PVC: `bazarr-nebula-pvc`
