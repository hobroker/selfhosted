# `wakatime-exporter`

> Exports Prometheus metrics from Wakatime.

Source Code: https://github.com/MacroPower/wakatime_exporter
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync wakatime-exporter
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config/
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install wakatime-exporter bjw-s/app-template \
  --namespace monitoring --create-namespace \
  -f values.yaml
```

### Secrets

The following environment variable is required and sourced from the `infisical-wakatime-secret`:

| name           | description               |
| -------------- | ------------------------- |
| `WAKA_API_KEY` | API key from wakatime.com |
