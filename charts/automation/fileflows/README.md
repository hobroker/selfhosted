# `fileflows`

> File processing application

Source Code: https://github.com/revenz/FileFlows
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync fileflows
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install fileflows bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Host Volumes

| hostPath                        | containerPath   | description                            |
| ------------------------------- | --------------- | -------------------------------------- |
| `/appdata/k3s/fileflows/common` | `/app/common`   | Shared application data                |
| `/appdata/k3s/fileflows/Data`   | `/app/Data`     | Application database and state         |
| `/appdata/k3s/fileflows/Logs`   | `/app/Logs`     | Application logs                       |
| `/transcode_cache`              | `/temp`         | Temporary directory for transcoding    |
| `/mnt/nebula`                   | `/media/nebula` | Access to media library for processing |
