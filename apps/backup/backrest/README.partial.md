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

| hostPath                              | containerPath | description                           |
| ------------------------------------- | ------------- | ------------------------------------- |
| `/var/local/backrest/data` (hostPath) | `/data`       | Backrest config, repos index and logs |
| `/var/local` (hostPath)               | `/var/local`  | Backrest varlocal data                |

PV: `backrest-data-pv` (Retain) → PVC: `backrest-data-pvc`
PV: `backrest-varlocal-pv` (Retain) → PVC: `backrest-varlocal-pvc`
