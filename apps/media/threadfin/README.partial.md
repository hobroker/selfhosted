---
description: An M3U proxy for Kernel/Plex/Jellyfin/Emby based on xTeVe
sourceCode: https://github.com/Threadfin/Threadfin
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                 | container path         | type       | description               |
| ---------------------- | ---------------------- | ---------- | ------------------------- |
| `/var/local/threadfin` | `/home/threadfin/conf` | `hostPath` | Application configuration |
| —                      | `/tmp/threadfin`       | `emptyDir` | Temporary files           |

PV: `threadfin-config-pv` → PVC: `threadfin-config-pvc`
