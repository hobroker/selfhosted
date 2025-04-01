# `sonarr`

> A TV series tracking and automation tool for downloading episodes as they air.

Source Code: https://github.com/Sonarr/Sonarr

## Installing/upgrading

```shell
kubectl apply -f config

helmfile apply
```

### Host Volumes

| hostPath              | containerPath |
| --------------------- | ------------- |
| `/appdata/k3s/sonarr` | `/config`     |
| `/storage/tv-shows`   | `/tv`         |
| `/mnt/onetb/tv-shows` | `/tv2`        |
| `/storage/downloads`  | `/downloads`  |

### Secrets

| name     | description           |
| -------- | --------------------- |
| `APIKEY` | API key for exportarr |
