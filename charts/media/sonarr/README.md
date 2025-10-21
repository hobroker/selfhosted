# `sonarr`

> A TV series tracking and automation tool for downloading episodes as they air.

Source Code: https://github.com/Sonarr/Sonarr

## Installing/upgrading

```shell
kubectl apply -f config

helmfile apply
```

### Host Volumes

| hostPath                | containerPath |
| ----------------------- | ------------- |
| `/appdata/k3s/sonarr`   | `/config`     |
| `/mnt/nebula/tv-shows`  | `/tvshows`    |
| `/mnt/nebula/downloads` | `/downloads`  |
