# `prowlarr`

> Indexer manager/proxy built on the popular \*arr stack to integrate with various PVR apps

Source Code: https://github.com/Prowlarr/Prowlarr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register (first time)
kubectl apply -f application.yaml

# Upgrade - bump targetRevision in application.yaml, then sync via ArgoCD UI or:
argocd app sync prowlarr
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install prowlarr bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Host Volumes

| hostPath                | containerPath | description                            |
| ----------------------- | ------------- | -------------------------------------- |
| `/appdata/k3s/prowlarr` | `/config`     | Application configuration and database |
