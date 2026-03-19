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
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install fileflows bjw-s/app-template -f values.yaml
```

## Storage

| source                     | container path  | type       | description                              |
| -------------------------- | --------------- | ---------- | ---------------------------------------- |
| `/var/local/fileflows`     | `/app/common`   | `hostPath` | Shared application data (subPath)        |
| `/var/local/fileflows`     | `/app/Data`     | `hostPath` | Application database and state (subPath) |
| `/var/local/fileflows`     | `/app/Logs`     | `hostPath` | Application logs (subPath)               |
| N/A                        | `/temp`         | `emptyDir` | Temporary directory for transcoding      |
| `192.168.50.7:/mnt/nebula` | `/media/nebula` | `nfs`      | Media library for processing             |
