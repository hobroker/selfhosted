# `syncthing`

> Continuous file synchronization

Source Code: https://github.com/syncthing/syncthing  
Chart: https://bjw-s.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath                 | containerPath |
|--------------------------|---------------|
| `/appdata/k3s/syncthing` | `/config`     |
| `/mnt/wdata`             | `/mnt/wdata`  |
