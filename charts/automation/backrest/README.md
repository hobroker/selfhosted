# `backrest`

> A web-accessible backup solution built on top of restic

Source Code: https://github.com/garethgeorge/backrest
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register
kubectl apply -f application.yaml

# Upgrade - via ArgoCD UI or:
argocd app sync backrest
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install backrest bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Host Volumes

| hostPath                | containerPath | description                           |
| ----------------------- | ------------- | ------------------------------------- |
| `/appdata/k3s/backrest` | `/data`       | Backrest config, repos index and logs |
