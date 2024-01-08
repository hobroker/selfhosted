About `qbittorrent`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install qbittorrent bjw-s/app-template -f downloads/qbittorrent/values.yaml
```

### Assumptions
- folder `/config` will be mounted as `hostPath` to `/appdata/k3s/qbittorrent`
- folder `/blackhole` will be mounted as `hostPath` to `/storage/downloads/torrents`
- folder `/downloads` will be mounted as `hostPath` to `/storage/downloads`
