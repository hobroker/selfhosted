# `rsnapshot`

> A tool for backing up your data using rsync

App: https://github.com/rsnapshot/rsnapshot  
Chart: https://bjw-s.github.io/helm-charts/docs/app-template/

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
