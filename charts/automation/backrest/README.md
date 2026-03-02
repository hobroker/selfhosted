# `backrest`

> A web-accessible backup solution built on top of restic

Source Code: https://github.com/garethgeorge/backrest
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath                | containerPath | description                           |
| ----------------------- | ------------- | ------------------------------------- |
| `/appdata/k3s/backrest` | `/data`       | Backrest config, repos index and logs |
