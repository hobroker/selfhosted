About `code-server`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install code-server bjw-s/app-template -f development/code-server/values.yaml
```

### Assumptions
- folder `/config` will be mounted as `hostPath` to `/appdata/k3s/code-server`
- folder `/appdata` will be mounted as `hostPath` to `/appdata`
- folder `/downloa` will be mounted as `hostPath` to `/appdata`
- folder `/storage/ww` will be mounted as `hostPath` to `/storage/ww`
