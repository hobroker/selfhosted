# `code-server`
> VS Code running on a remote server, accessible through the browser

Source Code: https://github.com/linuxserver/docker-code-server
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath      | containerPath              |
| ------------- | -------------------------- |
| `/config`     | `/appdata/k3s/code-server` |
| `/appdata`    | `/appdata`                 |
| `/downloads`  | `/storage/downloads`       |
| `/storage/ww` | `/storage/ww`              |
