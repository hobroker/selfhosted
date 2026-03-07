# `http-https-echo`

> App that echoes request data as JSON (useful for debugging)

Source Code: https://github.com/mendhak/docker-http-https-echo
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register (first time)
kubectl apply -f application.yaml

# Upgrade - bump targetRevision in application.yaml, then sync via ArgoCD UI or:
argocd app sync http-https-echo
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install http-https-echo bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```
