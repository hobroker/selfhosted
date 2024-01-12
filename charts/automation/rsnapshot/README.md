About `rsnapshot`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install rsnapshot bjw-s/app-template -f automation/rsnapshot/values.yaml
```

### Host Volumes

| hostPath                | containerPath |
|-------------------------|---------------|
| `/appdata/rsnapshot`    | `/config`     |
| `/mnt/wdata`            | `/data`       |
| `/mnt/wdata/rsnapshots` | `/.snapshots` |
