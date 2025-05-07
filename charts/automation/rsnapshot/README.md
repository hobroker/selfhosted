# `rsnapshot`

> A tool for backing up data using rsync

Source Code: https://github.com/rsnapshot/rsnapshot  
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply
```

### Host Volumes

| hostPath                | containerPath |
| ----------------------- | ------------- |
| `/appdata/rsnapshot`    | `/config`     |
| `/mnt/wdata`            | `/data`       |
| `/mnt/wdata/rsnapshots` | `/.snapshots` |
