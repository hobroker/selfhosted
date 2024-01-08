About `sonarr`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install sonarr bjw-s/app-template -f media/sonarr/values.yaml
```

### Assumptions
- folder `/config` will be mounted as `hostPath` to `/appdata/k3s/sonarr`
- folder `/tv` will be mounted as `hostPath` to `/storage/tv-shows`
- folder `/tv2` will be mounted as `hostPath` to `/mnt/onetb/tv-shows`
- folder `/downloads` will be mounted as `hostPath` to `/storage/downloads`
