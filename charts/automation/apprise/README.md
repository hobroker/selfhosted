# `apprise`

> Push Notifications that work with just about every platform

Source Code: https://github.com/caronc/apprise
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath               | containerPath | description               |
| ---------------------- | ------------- | ------------------------- |
| `/appdata/k3s/apprise` | `/config`     | Application configuration |
