---
description: A modern media request and discovery tool.
sourceCode: https://github.com/seerr-team/seerr
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                        | containerPath | description                            |
| ----------------------------- | ------------- | -------------------------------------- |
| `/var/local/seerr` (hostPath) | `/app/config` | Application configuration and database |

PV: `seerr-config-pv` → PVC: `seerr-config-pvc`
