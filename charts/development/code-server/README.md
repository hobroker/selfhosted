About `code-server`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install code-server bjw-s/app-template -f development/code-server/values.yaml
```

### Host Volumes

| hostPath      | containerPath              |
|---------------|----------------------------|
| `/config`     | `/appdata/k3s/code-server` |
| `/appdata`    | `/appdata`                 |
| `/downloads`  | `/storage/downloads`       |
| `/storage/ww` | `/storage/ww`              |
