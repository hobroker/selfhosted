About `syncthing`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install syncthing bjw-s/app-template -f automation/syncthing/values.yaml
```

### Assumptions
- folder `/config` will be mounted as `hostPath` to `/appdata/k3s/syncthing`
- folder `/mnt/wdata` will be mounted as `hostPath` to `/mnt/wdata`
