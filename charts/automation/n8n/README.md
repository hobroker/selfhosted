# `n8n`

> Workflow automation platform

Source Code: https://github.com/n8n-io/n8n
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath           | containerPath     | description                            |
| ------------------ | ----------------- | -------------------------------------- |
| `/appdata/k3s/n8n` | `/home/node/.n8n` | Application configuration and database |
