# `overseerr`

> A tool for browsing and requesting new media content.

Source Code: https://github.com/sct/overseerr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath                 | containerPath |
| ------------------------ | ------------- |
| `/appdata/k3s/overseerr` | `/config`     |
