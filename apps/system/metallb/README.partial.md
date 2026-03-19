---
description: Layer 2 load balancer for bare-metal Kubernetes clusters
sourceCode: https://github.com/metallb/metallb
chart: https://metallb.github.io/metallb
---

## After Manual Helm Install

Once the helm chart is deployed and MetalLB CRDs are available, apply the IP pool config:

```sh
kubectl apply -f postsync/ippool.yaml
```

> When deploying via ArgoCD, `postsync/` is a separate source with `sync-wave: "1"` — applied automatically after the helm chart is healthy.

## Prerequisites

These must be applied once per cluster before deploying:

**1. Talos machine config** must have `allowSchedulingOnControlPlanes: true` — prevents Talos from adding the `exclude-from-external-load-balancers` label and `NoSchedule` taint to control-plane nodes, which would block MetalLB from announcing IPs:

```yaml
cluster:
  allowSchedulingOnControlPlanes: true
```
