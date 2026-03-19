---
description: VS Code running on a remote server, accessible through the browser
sourceCode: https://github.com/linuxserver/docker-code-server
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                              | containerPath | description               |
| ----------------------------------- | ------------- | ------------------------- |
| `/var/local/code-server` (hostPath) | `/config`     | Application configuration |
| `/var/local` (hostPath)             | `/var/local`  | Access to all local data  |

PV: `code-server-config-pv` → PVC: `code-server-config-pvc`
PV: `code-server-varlocal-pv` → PVC: `code-server-varlocal-pvc`
