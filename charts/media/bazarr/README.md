About `bazarr`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install bazarr bjw-s/app-template -f media/bazarr/values.yaml
```

### Host Volumes

| hostPath              | containerPath |
|-----------------------|---------------|
| `/appdata/k3s/bazarr` | `/config`     |
| `/storage`            | `/storage`    |
| `/mnt/onetb`          | `/storage2`   |
