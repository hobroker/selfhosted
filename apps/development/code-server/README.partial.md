---
description: VS Code running on a remote server, accessible through the browser
sourceCode: https://github.com/linuxserver/docker-code-server
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                   | container path | type       | description               |
| ------------------------ | -------------- | ---------- | ------------------------- |
| `/var/local/code-server` | `/config`      | `hostPath` | Application configuration |
| `/var/local`             | `/var/local`   | `hostPath` | Access to all local data  |

PV: `code-server-config-pv` → PVC: `code-server-config-pvc`
PV: `code-server-varlocal-pv` → PVC: `code-server-varlocal-pvc`
