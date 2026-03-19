---
description: File processing application
sourceCode: https://github.com/revenz/FileFlows
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                            | containerPath   | description                              |
| --------------------------------- | --------------- | ---------------------------------------- |
| `/var/local/fileflows` (hostPath) | `/app/common`   | Shared application data (subPath)        |
| `/var/local/fileflows` (hostPath) | `/app/Data`     | Application database and state (subPath) |
| `/var/local/fileflows` (hostPath) | `/app/Logs`     | Application logs (subPath)               |
| emptyDir                          | `/temp`         | Temporary directory for transcoding      |
| `192.168.50.7:/mnt/nebula` (NFS)  | `/media/nebula` | Media library for processing             |

PV: `fileflows-config-pv` → PVC: `fileflows-config-pvc`
PV: `fileflows-nebula-pv` → PVC: `fileflows-nebula-pvc`
