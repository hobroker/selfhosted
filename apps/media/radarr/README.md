# `radarr`

> A movie tracking and automation tool that downloads movies as they become available.

Source Code: https://github.com/Radarr/Radarr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync radarr
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install radarr bjw-s/app-template -f values.yaml
```

## Storage

| source                     | container path | type       | description                            |
| -------------------------- | -------------- | ---------- | -------------------------------------- |
| `/var/local/radarr`        | `/config`      | `hostPath` | Application configuration and database |
| `192.168.50.7:/mnt/nebula` | `/mnt/nebula`  | `nfs`      | Full nebula share (Movies, Downloads)  |
