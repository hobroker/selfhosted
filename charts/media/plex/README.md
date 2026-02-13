# `plex`

> A media server that organizes and streams video and audio content across devices.

Source Code: https://www.plex.tv/
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath            | containerPath |
| ------------------- | ------------- |
| `/appdata/k3s/plex` | `/config`     |
| `/storage`          | `/storage`    |
| `/mnt/nebula`       | `/mnt/nebula` |
