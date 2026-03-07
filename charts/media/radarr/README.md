# `radarr`

> A movie tracking and automation tool that downloads movies as they become available.

Source Code: https://github.com/Radarr/Radarr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register
kubectl apply -f application.yaml

# Upgrade - via ArgoCD UI or:
argocd app sync radarr
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install radarr bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Secrets

| name                        | description                                |
| --------------------------- | ------------------------------------------ |
| `infisical-scraparr-secret` | (Used by scraparr) Contains Radarr API key |

### Host Volumes

| hostPath                | containerPath        | description                            |
| ----------------------- | -------------------- | -------------------------------------- |
| `/appdata/k3s/radarr`   | `/config`            | Application configuration and database |
| `/mnt/nebula/movies`    | `/mnt/nebula/movies` | Movie library directory                |
| `/mnt/nebula/downloads` | `/downloads`         | Downloads directory for processing     |
