# `reloader`

> K8s controller to that does rolling upgrades on ConfigMap/Secrets changes

Source Code: https://github.com/stakater/Reloader
Chart: https://github.com/stakater/Reloader/tree/master/deployments/kubernetes/chart/reloader

## Installing/upgrading

```sh
# Register (first time)
kubectl apply -f application.yaml

# Upgrade - bump targetRevision in application.yaml, then sync via ArgoCD UI or:
argocd app sync reloader
```

### Manual Helm (without ArgoCD)

```sh
helm repo add stakater https://stakater.github.io/stakater-charts
helm repo update stakater
helm upgrade --install reloader stakater/reloader \
  --namespace kube-system --create-namespace \
  -f values.yaml
```

### Helm values

| chart      | values.yaml                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------- |
| `reloader` | https://github.com/stakater/Reloader/blob/master/deployments/kubernetes/chart/reloader/values.yaml |
