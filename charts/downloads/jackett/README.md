# `jackett`

> API Support for torrent trackers

Source Code: https://github.com/Jackett/Jackett  
Chart: https://bjw-s.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply -f downloads/jackett/helmfile.yaml
```

### Host Volumes

| hostPath                      | containerPath     |
| ----------------------------- | ----------------- |
| `/appdata/k3s/jackett`        | `/config/Jackett` |
| `/storage/downloads/torrents` | `/blackhole`      |
