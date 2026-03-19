---
description: A network-wide DNS ad blocker and privacy filter
sourceCode: https://github.com/AdguardTeam/AdGuardHome
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                                   | containerPath           | description         |
| ---------------------------------------- | ----------------------- | ------------------- |
| `/var/local/adguardhome/work` (hostPath) | `/opt/adguardhome/work` | Working data        |
| `/var/local/adguardhome/conf` (hostPath) | `/opt/adguardhome/conf` | Configuration files |

PV: `adguardhome-work-pv` → PVC: `adguardhome-work-pvc`
PV: `adguardhome-conf-pv` → PVC: `adguardhome-conf-pvc`
