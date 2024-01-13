# `prowlarr`

> Indexer manager/proxy built on the popular *arr stack to integrate with various PVR apps

Source Code: https://github.com/Prowlarr/Prowlarr  
Chart: https://bjw-s.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```shell
helmfile apply -f downloads/prowlarr/helmfile.yaml
```

### Assumptions

| hostPath                | containerPath |
| ----------------------- | ------------- |
| `/appdata/k3s/prowlarr` | `/config`     |
