---
description: A monitoring and analytics tool for Plex
sourceCode: https://github.com/Tautulli/Tautulli
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                           | containerPath | description                            |
| -------------------------------- | ------------- | -------------------------------------- |
| `/var/local/tautulli` (hostPath) | `/config`     | Application configuration and database |

PV: `tautulli-config-pv` → PVC: `tautulli-config-pvc`
