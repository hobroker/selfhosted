# `overseerr`

> A tool for browsing and requesting new media content.

Source Code: https://github.com/sct/overseerr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register (first time)
kubectl apply -f application.yaml

# Upgrade - bump targetRevision in application.yaml, then sync via ArgoCD UI or:
argocd app sync overseerr
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install overseerr bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Host Volumes

| hostPath                 | containerPath | description                            |
| ------------------------ | ------------- | -------------------------------------- |
| `/appdata/k3s/overseerr` | `/config`     | Application configuration and database |
