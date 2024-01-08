About `jellyfin`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install jellyfin bjw-s/app-template -f media/jellyfin/values.yaml
```

### Host Volumes

| hostPath                | containerPath |
|-------------------------|---------------|
| `/appdata/k3s/jellyfin` | `/config`     |
| `/storage`              | `/storage`    |
| `/mnt/onetb`            | `/storage2`   |
