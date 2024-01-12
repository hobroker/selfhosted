# `overseerr`

Docs: https://bjw-s.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply -f media/overseerr/helmfile.yaml
```

### Host Volumes

| hostPath                      | containerPath |
| ----------------------------- | ------------- |
| `/appdata/k3s/overseerr`      | `/config`     |
| `/storage/downloads/torrents` | `/blackhole`  |
