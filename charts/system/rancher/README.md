# `rancher`

> Container management platform

Source Code: https://github.com/rancher/rancher
Chart: https://github.com/rancher/rancher/tree/main/chart

## Installing/upgrading

```sh
# Register (first time)
kubectl apply -f application.yaml

# Upgrade - bump targetRevision in application.yaml, then sync via ArgoCD UI or:
argocd app sync rancher
```

### Manual Helm (without ArgoCD)

```sh
helm repo add rancher-latest https://releases.rancher.com/server-charts/latest
helm repo update rancher-latest
helm upgrade --install rancher rancher-latest/rancher \
  --namespace cattle-system --create-namespace \
  -f values.yaml
```

### Helm values

| chart     | values.yaml                                                    |
| --------- | -------------------------------------------------------------- |
| `rancher` | https://github.com/rancher/rancher/blob/main/chart/values.yaml |
