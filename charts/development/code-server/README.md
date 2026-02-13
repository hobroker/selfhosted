# `code-server`

> VS Code running on a remote server, accessible through the browser

Source Code: https://github.com/linuxserver/docker-code-server
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Helm values

| chart         | values.yaml                                                                           |
| ------------- | ------------------------------------------------------------------------------------- |
| `code-server` | https://github.com/bjw-s-labs/helm-charts/blob/main/charts/library/common/values.yaml |

### Host Volumes

| hostPath                   | containerPath           | description                                 |
| -------------------------- | ----------------------- | ------------------------------------------- |
| `/appdata/k3s/code-server` | `/config`               | Application configuration and user data     |
| `/appdata`                 | `/appdata`              | Direct access to application data directory |
| `/mnt/nebula/downloads`    | `/mnt/nebula/downloads` | Access to downloads directory               |
| `/storage/ww`              | `/storage/ww`           | Access to external storage                  |
| `/home/kira/.openclaw`     | `/home/kira/.openclaw`  | User-specific CLI tool data                 |
