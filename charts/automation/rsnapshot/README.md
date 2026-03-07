# `rsnapshot`

> A tool for backing up data using rsync

Source Code: https://github.com/rsnapshot/rsnapshot
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register (first time)
kubectl apply -f application.yaml

# Upgrade - bump targetRevision in application.yaml, then sync via ArgoCD UI or:
argocd app sync rsnapshot
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install rsnapshot bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Host Volumes

| hostPath                | containerPath | description                       |
| ----------------------- | ------------- | --------------------------------- |
| `/mnt/wdata`            | `/data`       | Folder to share with the node     |
| `/mnt/wdata/rsnapshots` | `/.snapshots` | Destination for rsnapshot backups |
