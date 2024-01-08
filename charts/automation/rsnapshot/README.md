About `rsnapshot`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install rsnapshot bjw-s/app-template -f automation/rsnapshot/values.yaml
```

### Assumptions
- folder `/config` will be mounted as `hostPath` to `/appdata/rsnapshot`
- folder `/data` will be mounted as `hostPath` to `/mnt/wdata`
- folder `/.snapshots` will be mounted as `hostPath` to `/mnt/wdata/rsnapshots`
