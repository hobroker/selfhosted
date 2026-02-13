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

| name               | description      |
| ------------------ | ---------------- |
| `SONARR_API_KEY`   | Sonarr API key   |
| `RADARR_API_KEY`   | Radarr API key   |
| `PROWLARR_API_KEY` | Prowlarr API key |
| `BAZARR_API_KEY`   | Bazarr API key   |
