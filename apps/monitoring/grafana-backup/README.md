# `grafana-backup`

> Cron job to backup Grafana settings by using the Grafana API

Source Code: https://github.com/ysde/grafana-backup-tool
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync grafana-backup
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install grafana-backup bjw-s/app-template \
  --version 4.6.2 --namespace monitoring --create-namespace \
  -f values.yaml
```
