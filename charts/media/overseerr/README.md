# `overseerr`

> A management tool for browsing and requesting new media content.

Source Code: https://github.com/sct/overseerr

## Installing/upgrading

```shell
helmfile apply -f media/overseerr/helmfile.yaml
```

### Host Volumes

| hostPath                      | containerPath |
| ----------------------------- | ------------- |
| `/appdata/k3s/overseerr`      | `/config`     |
| `/storage/downloads/torrents` | `/blackhole`  |
