# `sonarr`

> A TV series tracking and automation tool for downloading episodes as they air.

Source Code: https://github.com/Sonarr/Sonarr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
kubectl apply -f config

helmfile apply
```

### Secrets

| name                        | description                                |
| --------------------------- | ------------------------------------------ |
| `infisical-scraparr-secret` | (Used by scraparr) Contains Sonarr API key |

### Host Volumes

| hostPath                | containerPath     | description                            |
| ----------------------- | ----------------- | -------------------------------------- |
| `/appdata/k3s/sonarr`   | `/config`         | Application configuration and database |
| `/mnt/nebula/tvshows`   | `/nebula/tvshows` | TV series library directory            |
| `/mnt/nebula/downloads` | `/downloads`      | Downloads directory for processing     |
