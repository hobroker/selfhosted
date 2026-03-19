---
description: A monitoring and analytics tool for Plex
sourceCode: https://github.com/Tautulli/Tautulli
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                | container path | type       | description                            |
| --------------------- | -------------- | ---------- | -------------------------------------- |
| `/var/local/tautulli` | `/config`      | `hostPath` | Application configuration and database |

PV: `tautulli-config-pv` → PVC: `tautulli-config-pvc`
