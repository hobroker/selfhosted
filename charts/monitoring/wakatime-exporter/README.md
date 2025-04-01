# `wakatime-exporter`

> Exports Prometheus metrics from Wakatime.

Source Code: https://github.com/MacroPower/wakatime_exporter

## Installing/upgrading

```shell
kubectl apply -f config

helmfile apply
```

### Secrets

| name           | description               |
| -------------- | ------------------------- |
| `WAKA_API_KEY` | API key from wakatime.com |
