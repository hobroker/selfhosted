# `reloader`

> K8s controller that triggers rolling upgrades when ConfigMaps or Secrets change

Source Code: https://github.com/stakater/Reloader
Chart: https://github.com/stakater/Reloader/tree/master/deployments/kubernetes/chart/reloader

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync reloader
```

### Manual Helm (without ArgoCD)

```sh
helm repo add stakater https://stakater.github.io/stakater-charts
helm repo update stakater
helm upgrade --install reloader stakater/reloader \
  --version 2.2.8 --namespace kube-system --create-namespace \
  -f values.yaml
```
