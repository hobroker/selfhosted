# `bazarr`

> Companion application to Sonarr and Radarr that manages and downloads subtitles.

Source Code: https://github.com/morpheus65535/bazarr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync bazarr
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install bazarr bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Host Volumes

| hostPath              | containerPath | description                                     |
| --------------------- | ------------- | ----------------------------------------------- |
| `/appdata/k3s/bazarr` | `/config`     | Application configuration and database          |
| `/mnt/nebula`         | `/mnt/nebula` | Access to media library for subtitle management |
