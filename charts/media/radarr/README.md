About `radarr`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/upgrading
---

```shell
helmfile apply -f media/radarr/helmfile.yaml
```

### Host Volumes

| hostPath              | containerPath |
|-----------------------|---------------|
| `/appdata/k3s/radarr` | `/config`     |
| `/storage/movies`     | `/movies`     |
| `/storage/downloads`  | `/downloads`  |
