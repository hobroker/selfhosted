About `radarr`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install radarr bjw-s/app-template -f media/radarr/values.yaml
```

### Assumptions
- folder `/config` will be mounted as `hostPath` to `/appdata/k3s/radarr`
- folder `/movies` will be mounted as `hostPath` to `/storage/movies`
- folder `/downloads` will be mounted as `hostPath` to `/storage/downloads`
