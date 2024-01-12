About `syncthing`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install syncthing bjw-s/app-template -f automation/syncthing/values.yaml
```

### Host Volumes

| hostPath                 | containerPath |
|--------------------------|---------------|
| `/appdata/k3s/syncthing` | `/config`     |
| `/mnt/wdata`             | `/mnt/wdata`  |
