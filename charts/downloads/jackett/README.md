About `jackett`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install jackett bjw-s/app-template -f downloads/jackett/values.yaml
```

### Host Volumes

| hostPath                      | containerPath     |
|-------------------------------|-------------------|
| `/appdata/k3s/jackett`        | `/config/Jackett` |
| `/storage/downloads/torrents` | `/blackhole`      |
