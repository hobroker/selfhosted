---
description: Indexer manager/proxy built on the popular \*arr stack to integrate with various PVR apps
sourceCode: https://github.com/Prowlarr/Prowlarr
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                | container path | type       | description                            |
| --------------------- | -------------- | ---------- | -------------------------------------- |
| `/var/local/prowlarr` | `/config`      | `hostPath` | Application configuration and database |

PV: `prowlarr-config-pv` (1Gi, Retain) → PVC: `prowlarr-config-pvc` in namespace `default`
