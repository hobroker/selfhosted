---
description: Workflow automation platform
sourceCode: https://github.com/n8n-io/n8n
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                      | containerPath     | description                            |
| --------------------------- | ----------------- | -------------------------------------- |
| `/var/local/n8n` (hostPath) | `/home/node/.n8n` | Application configuration and database |

PV: `n8n-config-pv` → PVC: `n8n-config-pvc`
