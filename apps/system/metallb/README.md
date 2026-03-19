# `metallb`

> Layer 2 load balancer for bare-metal Kubernetes clusters

Source Code: https://github.com/metallb/metallb
Chart: https://metallb.github.io/metallb

## Prerequisites

These must be applied once per cluster before deploying:

**1. Label the namespace as privileged** (required for speaker pod `NET_RAW`/`NET_ADMIN`):

```sh
kubectl create namespace metallb-system
kubectl label namespace metallb-system pod-security.kubernetes.io/enforce=privileged
```

**2. Talos machine config** must have `allowSchedulingOnControlPlanes: true` — prevents Talos from adding the `exclude-from-external-load-balancers` label and `NoSchedule` taint to control-plane nodes, which would block MetalLB from announcing IPs:

```yaml
cluster:
  allowSchedulingOnControlPlanes: true
```

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync metallb

# Apply the IP pool configuration (once per cluster):
kubectl apply -f ippool.yaml
```

### Manual Helm (without ArgoCD)

```sh
helm repo add metallb https://metallb.github.io/metallb
helm repo update metallb
helm upgrade --install metallb metallb/metallb \
  --namespace metallb-system --create-namespace \
  -f values.yaml

kubectl apply -f ippool.yaml
```

### Helm values

| chart     | values.yaml                                                             |
| --------- | ----------------------------------------------------------------------- |
| `metallb` | https://github.com/metallb/metallb/blob/main/charts/metallb/values.yaml |

## IP Pool

| IP               | service                         |
| ---------------- | ------------------------------- |
| `192.168.50.200` | shared (qbittorrent, plex, etc) |
| `192.168.50.201` | Traefik                         |
