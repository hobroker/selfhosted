# `tautulli`

Docs: https://bjw-s.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply -f media/tautulli/helmfile.yaml
```

### Host Volumes

| hostPath                | containerPath |
| ----------------------- | ------------- |
| `/appdata/k3s/tautulli` | `/config`     |
