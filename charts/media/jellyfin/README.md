# `jellyfin`

> An open-source media server

Source Code: https://github.com/jellyfin/jellyfin
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync jellyfin
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install jellyfin bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Host Volumes

| hostPath                | containerPath | description                            |
| ----------------------- | ------------- | -------------------------------------- |
| `/appdata/k3s/jellyfin` | `/config`     | Application configuration and database |
| `/mnt/nebula`           | `/mnt/nebula` | Access to media library for streaming  |
