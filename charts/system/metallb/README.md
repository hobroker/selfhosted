# MetalLB

## Prerequisites

Before deploying, apply these once per cluster:

**1. Label the namespace as privileged** (required for speaker pod to run with NET_RAW/NET_ADMIN):

```bash
kubectl create namespace metallb-system
kubectl label namespace metallb-system pod-security.kubernetes.io/enforce=privileged
```

**2. Talos machine config** must have `allowSchedulingOnControlPlanes: true` (prevents Talos from adding the `exclude-from-external-load-balancers` label and `NoSchedule` taint to control-plane nodes, which would block MetalLB from announcing IPs):

```yaml
cluster:
  allowSchedulingOnControlPlanes: true
```

## Deploy

```bash
helmfile apply
kubectl apply -f ippool.yaml
```

## IP Pool

- `192.168.50.200` — general services
- `192.168.50.201` — Traefik
