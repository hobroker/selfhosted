---
description: A web-accessible backup solution built on top of restic
sourceCode: https://github.com/garethgeorge/backrest
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Prerequisites

Create the directory on the Talos node before deploying:

```bash
# Via a privileged pod or copy-helper
mkdir -p /var/local/backrest/data
```

## Storage

| source                     | container path | type       | description                           |
| -------------------------- | -------------- | ---------- | ------------------------------------- |
| `/var/local/backrest/data` | `/data`        | `hostPath` | Backrest config, repos index and logs |
| `/var/local`               | `/var/local`   | `hostPath` | Backrest varlocal data                |

PV: `backrest-data-pv` (Retain) → PVC: `backrest-data-pvc`
PV: `backrest-varlocal-pv` (Retain) → PVC: `backrest-varlocal-pvc`
