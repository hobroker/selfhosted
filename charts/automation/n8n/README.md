# `n8n`

> Workflow automation platform

Source Code: https://github.com/n8n-io/n8n
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register (first time)
kubectl apply -f application.yaml

# Upgrade - bump targetRevision in application.yaml, then sync via ArgoCD UI or:
argocd app sync n8n
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install n8n bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Host Volumes

| hostPath           | containerPath     | description                            |
| ------------------ | ----------------- | -------------------------------------- |
| `/appdata/k3s/n8n` | `/home/node/.n8n` | Application configuration and database |
