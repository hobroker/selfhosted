# `threadfin`

> An M3U proxy for Kernel/Plex/Jellyfin/Emby based on xTeVe

Source Code: https://github.com/Threadfin/Threadfin
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath                      | containerPath          | description               |
| ----------------------------- | ---------------------- | ------------------------- |
| `/appdata/k3s/threadfin/conf` | `/home/threadfin/conf` | Application configuration |
| `/appdata/k3s/threadfin/temp` | `/tmp/threadfin`       | Temporary files directory |
