# `jellyfin`

> An open-source media server

Source Code: https://github.com/jellyfin/jellyfin

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
