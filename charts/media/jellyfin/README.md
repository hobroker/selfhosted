# `jellyfin`

> An open-source media server

Source Code: https://github.com/jellyfin/jellyfin
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath                | containerPath | description                            |
| ----------------------- | ------------- | -------------------------------------- |
| `/appdata/k3s/jellyfin` | `/config`     | Application configuration and database |
| `/mnt/nebula`           | `/mnt/nebula` | Access to media library for streaming  |
