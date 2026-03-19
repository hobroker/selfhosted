# `metallb`

> Layer 2 load balancer for bare-metal Kubernetes clusters

Source Code: https://github.com/metallb/metallb
Chart: https://metallb.github.io/metallb

## Prerequisites

These must be applied once per cluster before deploying:

**1. Talos machine config** must have `allowSchedulingOnControlPlanes: true` — prevents Talos from adding the `exclude-from-external-load-balancers` label and `NoSchedule` taint to control-plane nodes, which would block MetalLB from announcing IPs:

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
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -k config
helm repo add metallb https://metallb.github.io/metallb
helm repo update metallb
helm upgrade --install metallb metallb/metallb \
  --namespace metallb-system --create-namespace \
  -f values.yaml
```

## After Manual Helm Install

Once the helm chart is deployed and MetalLB CRDs are available, apply the IP pool config:

```sh
kubectl apply -f postsync/ippool.yaml
```

> When deploying via ArgoCD, `postsync/` is a separate source — resources are annotated with `hook: PostSync` and applied automatically after the helm chart is healthy.

### Helm values

| chart     | values.yaml                                                             |
| --------- | ----------------------------------------------------------------------- |
| `metallb` | https://github.com/metallb/metallb/blob/main/charts/metallb/values.yaml |
