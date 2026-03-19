---
description: A modern media request and discovery tool.
sourceCode: https://github.com/seerr-team/seerr
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source             | container path | type       | description                            |
| ------------------ | -------------- | ---------- | -------------------------------------- |
| `/var/local/seerr` | `/app/config`  | `hostPath` | Application configuration and database |

PV: `seerr-config-pv` → PVC: `seerr-config-pvc`
