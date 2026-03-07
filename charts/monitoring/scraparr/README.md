# `scraparr`

> Prometheus Exporter for various components of the \*arr Suite.

Source Code: https://github.com/thecfu/scraparr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register
kubectl apply -f application.yaml

# Upgrade - via ArgoCD UI or:
argocd app sync scraparr
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config/
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install scraparr bjw-s/app-template \
  --namespace monitoring --create-namespace \
  -f values.yaml
```

### Secrets

The following environment variables are required and sourced from the `infisical-scraparr-secret`:

| name               | description          |
| ------------------ | -------------------- |
| `SONARR_API_KEY`   | API key for Sonarr   |
| `RADARR_API_KEY`   | API key for Radarr   |
| `PROWLARR_API_KEY` | API key for Prowlarr |
| `BAZARR_API_KEY`   | API key for Bazarr   |
