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
helm upgrade --install radarr bjw-s/app-template \
  --version 4.6.2 -f values.yaml
```

## Storage

| Name     | Source                     | Container Path | Size  |
| -------- | -------------------------- | -------------- | ----- |
| `config` | `/var/local/radarr`        | `/config`      | 1Gi   |
| `nebula` | `192.168.50.7:/mnt/nebula` | `/mnt/nebula`  | 100Ti |
