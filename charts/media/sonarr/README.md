# `sonarr`

Docs: https://bjw-s.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply -f media/sonarr/helmfile.yaml
```

### Host Volumes

| hostPath              | containerPath |
| --------------------- | ------------- |
| `/appdata/k3s/sonarr` | `/config`     |
| `/storage/tv-shows`   | `/tv`         |
| `/mnt/onetb/tv-shows` | `/tv2`        |
| `/storage/downloads`  | `/downloads`  |
