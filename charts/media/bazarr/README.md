# `bazarr`

> Companion application to Sonarr and Radarr that manages and downloads subtitles.

Source Code: https://github.com/morpheus65535/bazarr

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath              | containerPath |
| --------------------- | ------------- |
| `/appdata/k3s/bazarr` | `/config`     |
| `/storage`            | `/storage`    |
| `/mnt/onetb`          | `/storage2`   |
