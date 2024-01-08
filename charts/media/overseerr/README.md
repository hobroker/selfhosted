About `overseerr`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install overseerr bjw-s/app-template -f media/overseerr/values.yaml
```

### Assumptions
- folder `/config/Jackett` will be mounted as `hostPath` to `/appdata/k3s/overseerr`
- folder `/blackhole` will be mounted as `hostPath` to `/storage/downloads/torrents`
