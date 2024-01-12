About `bazarr`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/upgrading
---

```shell
helmfile apply -f media/bazarr/helmfile.yaml
```

### Host Volumes

| hostPath              | containerPath |
|-----------------------|---------------|
| `/appdata/k3s/bazarr` | `/config`     |
| `/storage`            | `/storage`    |
| `/mnt/onetb`          | `/storage2`   |
