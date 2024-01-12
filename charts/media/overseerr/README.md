About `overseerr`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install overseerr bjw-s/app-template -f media/overseerr/values.yaml
```

### Host Volumes

| hostPath                      | containerPath |
|-------------------------------|---------------|
| `/appdata/k3s/overseerr`      | `/config`     |
| `/storage/downloads/torrents` | `/blackhole`  |
