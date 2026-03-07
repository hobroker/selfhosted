# `apprise`

> Push Notifications that work with just about every platform

Source Code: https://github.com/caronc/apprise
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register
kubectl apply -f application.yaml

# Upgrade - via ArgoCD UI or:
argocd app sync apprise
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install apprise bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Host Volumes

| hostPath               | containerPath | description               |
| ---------------------- | ------------- | ------------------------- |
| `/appdata/k3s/apprise` | `/config`     | Application configuration |
