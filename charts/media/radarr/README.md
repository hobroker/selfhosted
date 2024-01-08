About `radarr`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install radarr bjw-s/app-template -f media/radarr/values.yaml
```

### Host Volumes

| hostPath              | containerPath |
|-----------------------|---------------|
| `/appdata/k3s/radarr` | `/config`     |
| `/storage/movies`     | `/movies`     |
| `/storage/downloads`  | `/downloads`  |
