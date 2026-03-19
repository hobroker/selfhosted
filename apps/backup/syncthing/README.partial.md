---
description: Continuous file synchronization
sourceCode: https://github.com/syncthing/syncthing
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                                     | containerPath           | description               |
| ------------------------------------------ | ----------------------- | ------------------------- |
| `/var/local/syncthing` (hostPath)          | `/config`               | Application configuration |
| `192.168.50.7:/mnt/nebula/syncthing` (NFS) | `/mnt/nebula/syncthing` | Synced data               |

PV: `syncthing-config-pv` → PVC: `syncthing-config-pvc`
PV: `syncthing-storage-pv` → PVC: `syncthing-storage-pvc`
