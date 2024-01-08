About `plex`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install plex bjw-s/app-template -f media/plex/values.yaml
```

### Host Volumes

| hostPath            | containerPath |
|---------------------|---------------|
| `/appdata/k3s/plex` | `/config`     |
| `/storage`          | `/storage`    |
| `/mnt/onetb`        | `/storage2`   |
