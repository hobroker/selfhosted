# `syncthing`

> Open Source Continuous File Synchronization

Chart: https://bjw-s.github.io/helm-charts/docs/app-template/  
App: https://github.com/syncthing/syncthing

## Installing/upgrading

```shell
helmfile apply -f automation/syncthing/helmfile.yaml
```

### Host Volumes

| hostPath                 | containerPath |
| ------------------------ | ------------- |
| `/appdata/k3s/syncthing` | `/config`     |
| `/mnt/wdata`             | `/mnt/wdata`  |
