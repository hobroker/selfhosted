# `rsnapshot`

> A tool for backing up your data using rsync

Chart: https://bjw-s.github.io/helm-charts/docs/app-template/  
App: https://github.com/rsnapshot/rsnapshot

## Installing/upgrading

```shell
helmfile apply -f automation/rsnapshot/helmfile.yaml
```

### Host Volumes

| hostPath                | containerPath |
| ----------------------- | ------------- |
| `/appdata/rsnapshot`    | `/config`     |
| `/mnt/wdata`            | `/data`       |
| `/mnt/wdata/rsnapshots` | `/.snapshots` |
