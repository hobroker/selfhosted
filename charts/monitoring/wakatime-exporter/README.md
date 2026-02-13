# `wakatime-exporter`

> Exports Prometheus metrics from Wakatime.

Source Code: https://github.com/MacroPower/wakatime_exporter
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
kubectl apply -f config

helmfile apply
```

### Secrets

The following environment variable is required and sourced from the `infisical-wakatime-secret`:

| name           | description               |
| -------------- | ------------------------- |
| `WAKA_API_KEY` | API key from wakatime.com |
