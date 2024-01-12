About `rsnapshot`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/upgrading
---

```shell
helmfile apply -f automation/rsnapshot/helmfile.yaml
```

### Host Volumes

| hostPath                | containerPath |
|-------------------------|---------------|
| `/appdata/rsnapshot`    | `/config`     |
| `/mnt/wdata`            | `/data`       |
| `/mnt/wdata/rsnapshots` | `/.snapshots` |
