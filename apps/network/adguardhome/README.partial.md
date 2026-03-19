---
description: A network-wide DNS ad blocker and privacy filter
sourceCode: https://github.com/AdguardTeam/AdGuardHome
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Storage

| source                        | container path          | type       | description         |
| ----------------------------- | ----------------------- | ---------- | ------------------- |
| `/var/local/adguardhome/work` | `/opt/adguardhome/work` | `hostPath` | Working data        |
| `/var/local/adguardhome/conf` | `/opt/adguardhome/conf` | `hostPath` | Configuration files |

PV: `adguardhome-work-pv` → PVC: `adguardhome-work-pvc`
PV: `adguardhome-conf-pv` → PVC: `adguardhome-conf-pvc`
