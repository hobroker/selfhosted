About `jellyfin`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install jellyfin bjw-s/app-template -f media/jellyfin/values.yaml
```

### Assumptions
- folder `/config/Jackett` will be mounted as `hostPath` to `/appdata/k3s/jellyfin`
- folder `/storage` will be mounted as `hostPath` to `/storage`
- folder `/storage2` will be mounted as `hostPath` to `/mnt/onetb`
