# `bazarr`

> Companion application to Sonarr and Radarr that manages and downloads subtitles.

Source Code: https://github.com/morpheus65535/bazarr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath              | containerPath | description                                     |
| --------------------- | ------------- | ----------------------------------------------- |
| `/appdata/k3s/bazarr` | `/config`     | Application configuration and database          |
| `/mnt/nebula`         | `/mnt/nebula` | Access to media library for subtitle management |
