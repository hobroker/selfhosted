About `qbittorrent`
===
Chart docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install qbittorrent bjw-s/app-template -f downloads/qbittorrent/values.yaml
```

### Host Volumes

| hostPath                      | containerPath |
|-------------------------------|---------------|
| `/appdata/k3s/qbittorrent`    | `/config`     |
| `/storage/downloads/torrents` | `/blackhole`  |
| `/storage/downloads`          | `/downloads`  |
