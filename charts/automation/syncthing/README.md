About `syncthing`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/upgrading
---

```shell
helmfile apply -f automation/syncthing/helmfile.yaml
```

### Host Volumes

| hostPath                 | containerPath |
|--------------------------|---------------|
| `/appdata/k3s/syncthing` | `/config`     |
| `/mnt/wdata`             | `/mnt/wdata`  |
