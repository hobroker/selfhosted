# `scraparr`

> Prometheus Exporter for various components of the \*arr Suite.

Source Code: https://github.com/thecfu/scraparr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
kubectl apply -f config

helmfile apply
```

### Secrets

The following environment variables are required and sourced from the `infisical-scraparr-secret`:

| name               | description          |
| ------------------ | -------------------- |
| `SONARR_API_KEY`   | API key for Sonarr   |
| `RADARR_API_KEY`   | API key for Radarr   |
| `PROWLARR_API_KEY` | API key for Prowlarr |
| `BAZARR_API_KEY`   | API key for Bazarr   |
