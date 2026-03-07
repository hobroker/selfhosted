# `plex`

> A media server that organizes and streams video and audio content across devices.

Source Code: https://www.plex.tv/
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync plex
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install plex bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Host Volumes

| hostPath            | containerPath | description                            |
| ------------------- | ------------- | -------------------------------------- |
| `/appdata/k3s/plex` | `/config`     | Application configuration and database |
| `/storage`          | `/storage`    | Access to main storage                 |
| `/mnt/nebula`       | `/nebula`     | Access to media library                |
