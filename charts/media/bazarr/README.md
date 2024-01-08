About `bazarr`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install bazarr bjw-s/app-template -f media/bazarr/values.yaml
```

### Assumptions
- folder `/config/Jackett` will be mounted as `hostPath` to `/appdata/k3s/bazarr`
- folder `/storage` will be mounted as `hostPath` to `/storage`
- folder `/storage2` will be mounted as `hostPath` to `/mnt/onetb`
