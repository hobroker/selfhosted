# `qbittorrent`

> Bittorrent client with a feature rich Web UI for remote access

Source Code: https://github.com/qbittorrent/qBittorrent  
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath                      | containerPath |
| ----------------------------- | ------------- |
| `/appdata/k3s/qbittorrent`    | `/config`     |
| `/storage/downloads/torrents` | `/blackhole`  |
| `/storage/downloads`          | `/downloads`  |
