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
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install bazarr bjw-s/app-template \
  --version 4.6.2 -f values.yaml
```

## Storage

| Name     | Source                     | Container Path | Size  |
| -------- | -------------------------- | -------------- | ----- |
| `config` | `/var/local/bazarr`        | `/config`      | 1Gi   |
| `nebula` | `192.168.50.7:/mnt/nebula` | `/mnt/nebula`  | 100Ti |
