---
description: An M3U proxy for Kernel/Plex/Jellyfin/Emby based on xTeVe
sourceCode: https://github.com/Threadfin/Threadfin
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                            | containerPath          | description               |
| --------------------------------- | ---------------------- | ------------------------- |
| `/var/local/threadfin` (hostPath) | `/home/threadfin/conf` | Application configuration |
| emptyDir                          | `/tmp/threadfin`       | Temporary files           |

PV: `threadfin-config-pv` → PVC: `threadfin-config-pvc`
