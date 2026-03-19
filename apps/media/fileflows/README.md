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
helm upgrade --install fileflows bjw-s/app-template \
  --version 4.6.2 -f values.yaml
```

## Storage

| source                            | containerPath   | description                              |
| --------------------------------- | --------------- | ---------------------------------------- |
| `/var/local/fileflows` (hostPath) | `/app/common`   | Shared application data (subPath)        |
| `/var/local/fileflows` (hostPath) | `/app/Data`     | Application database and state (subPath) |
| `/var/local/fileflows` (hostPath) | `/app/Logs`     | Application logs (subPath)               |
| emptyDir                          | `/temp`         | Temporary directory for transcoding      |
| `192.168.50.7:/mnt/nebula` (NFS)  | `/media/nebula` | Media library for processing             |

PV: `fileflows-config-pv` → PVC: `fileflows-config-pvc`
PV: `fileflows-nebula-pv` → PVC: `fileflows-nebula-pvc`
