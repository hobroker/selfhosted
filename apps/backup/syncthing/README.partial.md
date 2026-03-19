---
description: Continuous file synchronization
sourceCode: https://github.com/syncthing/syncthing
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                               | container path          | type       | description               |
| ------------------------------------ | ----------------------- | ---------- | ------------------------- |
| `/var/local/syncthing`               | `/config`               | `hostPath` | Application configuration |
| `192.168.50.7:/mnt/nebula/syncthing` | `/mnt/nebula/syncthing` | `nfs`      | Synced data               |

PV: `syncthing-config-pv` → PVC: `syncthing-config-pvc`
PV: `syncthing-storage-pv` → PVC: `syncthing-storage-pvc`
