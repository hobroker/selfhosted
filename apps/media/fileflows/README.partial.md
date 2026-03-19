---
description: File processing application
sourceCode: https://github.com/revenz/FileFlows
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                     | container path  | type       | description                              |
| -------------------------- | --------------- | ---------- | ---------------------------------------- |
| `/var/local/fileflows`     | `/app/common`   | `hostPath` | Shared application data (subPath)        |
| `/var/local/fileflows`     | `/app/Data`     | `hostPath` | Application database and state (subPath) |
| `/var/local/fileflows`     | `/app/Logs`     | `hostPath` | Application logs (subPath)               |
| —                          | `/temp`         | `emptyDir` | Temporary directory for transcoding      |
| `192.168.50.7:/mnt/nebula` | `/media/nebula` | `nfs`      | Media library for processing             |

PV: `fileflows-config-pv` → PVC: `fileflows-config-pvc`
PV: `fileflows-nebula-pv` → PVC: `fileflows-nebula-pvc`
