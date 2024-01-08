About `plex`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install plex bjw-s/app-template -f media/plex/values.yaml
```

### Assumptions
- folder `/config` will be mounted as `hostPath` to `/appdata/k3s/plex`
- folder `/storage` will be mounted as `hostPath` to `/storage`
- folder `/storage2` will be mounted as `hostPath` to `/mnt/onetb`
