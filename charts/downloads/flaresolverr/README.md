# `flaresolverr`

> Proxy server to bypass Cloudflare protection

Source Code: https://github.com/FlareSolverr/FlareSolverr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync flaresolverr
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install flaresolverr bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```
