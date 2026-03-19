---
description: HTTP reverse proxy and load balancer
sourceCode: https://github.com/traefik/traefik
chart: https://github.com/traefik/traefik-helm-chart
---

## Storage

| source                               | containerPath | description                                 |
| ------------------------------------ | ------------- | ------------------------------------------- |
| `/var/local/traefik/acme` (hostPath) | `/acme`       | Storage for ACME certificates (letsencrypt) |

PV: `traefik-acme-pv` → PVC: `traefik-acme-pvc`
