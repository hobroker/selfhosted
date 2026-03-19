# `scraparr`

> Prometheus Exporter for various components of the \*arr Suite.

Source Code: https://github.com/thecfu/scraparr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync scraparr
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -k config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install scraparr bjw-s/app-template \
  --version 4.6.2 --namespace monitoring --create-namespace \
  -f values.yaml
```
