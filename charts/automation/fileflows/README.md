# `fileflows`

> File processing application

Source Code: https://github.com/revenz/FileFlows
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath                        | containerPath   | description                            |
| ------------------------------- | --------------- | -------------------------------------- |
| `/appdata/k3s/fileflows/common` | `/app/common`   | Shared application data                |
| `/appdata/k3s/fileflows/Data`   | `/app/Data`     | Application database and state         |
| `/appdata/k3s/fileflows/Logs`   | `/app/Logs`     | Application logs                       |
| `/transcode_cache`              | `/temp`         | Temporary directory for transcoding    |
| `/mnt/nebula`                   | `/media/nebula` | Access to media library for processing |
