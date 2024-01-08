About `jackett`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install jackett bjw-s/app-template -f downloads/jackett/values.yaml
```

### Assumptions
- folder `/config/Jackett` will be mounted as `hostPath` to `/appdata/k3s/jackett`
- folder `/blackhole` will be mounted as `hostPath` to `/storage/downloads/torrents`
