---
description: An open-source media server
sourceCode: https://github.com/jellyfin/jellyfin
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                           | containerPath | description                            |
| -------------------------------- | ------------- | -------------------------------------- |
| `/var/local/jellyfin` (hostPath) | `/config`     | Application configuration and database |
| `192.168.50.7:/mnt/nebula` (NFS) | `/mnt/nebula` | Media library                          |

PV: `jellyfin-config-pv` → PVC: `jellyfin-config-pvc`
PV: `jellyfin-nebula-pv` → PVC: `jellyfin-nebula-pvc`
