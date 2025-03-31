# `jellyfin`

> An open-source media server

Source Code: https://bjw-s.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath                | containerPath |
| ----------------------- | ------------- |
| `/appdata/k3s/jellyfin` | `/config`     |
| `/storage`              | `/storage`    |
| `/mnt/onetb`            | `/storage2`   |
