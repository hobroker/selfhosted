# `prometheus-operator`

> Operator that manages Prometheus, Grafana, and related monitoring components in K8s

Source Code: https://github.com/prometheus-operator/prometheus-operator
Chart: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync prometheus-operator
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update prometheus-community
helm upgrade --install prometheus-operator prometheus-community/kube-prometheus-stack \
  --version 82.10.4 --namespace monitoring --create-namespace \
  -f values.yaml
```
