# `seerr`

> A modern media request and discovery tool.

Source Code: https://github.com/seerr-team/seerr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync seerr
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install seerr bjw-s/app-template -f values.yaml
```

## Storage

| source             | container path | type       | description                            |
| ------------------ | -------------- | ---------- | -------------------------------------- |
| `/var/local/seerr` | `/app/config`  | `hostPath` | Application configuration and database |
