# `jellyfin`

Docs: https://bjw-s.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply -f media/jellyfin/helmfile.yaml
```

### Host Volumes

| hostPath                | containerPath |
| ----------------------- | ------------- |
| `/appdata/k3s/jellyfin` | `/config`     |
| `/storage`              | `/storage`    |
| `/mnt/onetb`            | `/storage2`   |
