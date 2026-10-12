# `rancher`

> Container management platform

Source Code: https://github.com/rancher/rancher
Chart: https://github.com/rancher/rancher/tree/main/chart

## Installing/upgrading

```sh
# Register / update the Application resource (it auto-syncs from then on)
kubectl apply -f application.yaml

# Optional: sync immediately instead of waiting for the next poll
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
