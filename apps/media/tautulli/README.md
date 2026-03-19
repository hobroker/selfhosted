# `tautulli`

> A monitoring and analytics tool for Plex

Source Code: https://github.com/Tautulli/Tautulli
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync tautulli
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install tautulli bjw-s/app-template \
  --version 4.6.2 -f values.yaml
```

## Storage

| Name     | Source                | Container Path | Size |
| -------- | --------------------- | -------------- | ---- |
| `config` | `/var/local/tautulli` | `/config`      | 1Gi  |
