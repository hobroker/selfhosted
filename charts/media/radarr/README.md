# `radarr`

> A movie tracking and automation tool that downloads movies as they become available.

Source Code: https://github.com/Radarr/Radarr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

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
