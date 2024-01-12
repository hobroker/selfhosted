# `plex`

Docs: https://bjw-s.github.io/helm-charts/docs/app-template/

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
