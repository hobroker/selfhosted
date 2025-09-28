# `radarr`

> A movie tracking and automation tool that downloads movies as they become available.

Source Code: https://github.com/Radarr/Radarr

## Installing/upgrading

```shell
kubectl apply -f config

helmfile apply
```

### Host Volumes

| hostPath                | containerPath        |
| ----------------------- | -------------------- |
| `/appdata/k3s/radarr`   | `/config`            |
| `/mnt/nebula/movies`    | `/mnt/nebula/movies` |
| `/mnt/nebula/downloads` | `/downloads`         |

### Secrets

| name     | description           |
| -------- | --------------------- |
| `APIKEY` | API key for exportarr |
