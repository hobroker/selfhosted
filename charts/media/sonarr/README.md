About `sonarr`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install sonarr bjw-s/app-template -f media/sonarr/values.yaml
```

### Host Volumes

| hostPath              | containerPath |
|-----------------------|---------------|
| `/appdata/k3s/sonarr` | `/config`     |
| `/storage/tv-shows`   | `/tv`         |
| `/mnt/onetb/tv-shows` | `/tv2`        |
| `/storage/downloads`  | `/downloads`  |
