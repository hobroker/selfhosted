# `prowlarr`

Docs: https://bjw-s.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply -f downloads/prowlarr/helmfile.yaml
```

### Assumptions

| hostPath                | containerPath |
| ----------------------- | ------------- |
| `/appdata/k3s/prowlarr` | `/config`     |
