# `radarr`

> A movie tracking and automation tool that downloads movies as they become available.

Source Code: https://github.com/Radarr/Radarr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
kubectl apply -f config

helmfile apply
```

### Secrets

| name                        | description                                |
| --------------------------- | ------------------------------------------ |
| `infisical-scraparr-secret` | (Used by scraparr) Contains Radarr API key |

### Host Volumes

| hostPath                | containerPath        | description                            |
| ----------------------- | -------------------- | -------------------------------------- |
| `/appdata/k3s/radarr`   | `/config`            | Application configuration and database |
| `/mnt/nebula/movies`    | `/mnt/nebula/movies` | Movie library directory                |
| `/mnt/nebula/downloads` | `/downloads`         | Downloads directory for processing     |
