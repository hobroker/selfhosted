About `tautulli`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install tautulli bjw-s/app-template -f media/tautulli/values.yaml
```

### Host Volumes

| hostPath                | containerPath |
|-------------------------|---------------|
| `/appdata/k3s/tautulli` | `/config`     |
