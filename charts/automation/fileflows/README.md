# `fileflows`

> File processing application

Source Code: https://github.com/revenz/FileFlows
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath                        | containerPath |
| ------------------------------- | ------------- |
| `/appdata/k3s/fileflows/common` | `/app/common` |
| `/appdata/k3s/fileflows/logs`   | `/app/logs`   |
| `/transcode_cache`              | `/temp`       |
| `/mnt/nebula`                   | `/mnt/nebula` |
