# `tautulli`

> A monitoring and analytics tool for Plex

Source Code: https://github.com/Tautulli/Tautulli

## Installing/upgrading

```shell
helmfile apply -f media/tautulli/helmfile.yaml
```

### Host Volumes

| hostPath                | containerPath |
| ----------------------- | ------------- |
| `/appdata/k3s/tautulli` | `/config`     |
