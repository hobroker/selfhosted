About `prowlarr`
===
Docs: https://bjw-s.github.io/helm-charts/docs/app-template/


Installing/updating
---

```shell
helm upgrade --install prowlarr bjw-s/app-template -f downloads/prowlarr/values.yaml
```

### Assumptions

| hostPath                      | containerPath |
|-------------------------------|---------------|
| `/appdata/k3s/prowlarr`       | `/config`     |
