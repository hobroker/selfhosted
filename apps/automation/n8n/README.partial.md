---
description: Workflow automation platform
sourceCode: https://github.com/n8n-io/n8n
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source           | container path    | type       | description                            |
| ---------------- | ----------------- | ---------- | -------------------------------------- |
| `/var/local/n8n` | `/home/node/.n8n` | `hostPath` | Application configuration and database |

PV: `n8n-config-pv` → PVC: `n8n-config-pvc`
