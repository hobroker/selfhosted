# `plex`

> A comprehensive media server that organizes and streams video and audio content across devices.

Docs: https://www.plex.tv/

## Installing/upgrading

```shell
helmfile apply -f media/plex/helmfile.yaml
```

### Host Volumes

| hostPath            | containerPath |
| ------------------- | ------------- |
| `/appdata/k3s/plex` | `/config`     |
| `/storage`          | `/storage`    |
| `/mnt/onetb`        | `/storage2`   |
