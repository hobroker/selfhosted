# `syncthing`

> Continuous file synchronization

Source Code: https://github.com/syncthing/syncthing
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync syncthing
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install syncthing bjw-s/app-template -f values.yaml
```

## Storage

| source                               | container path          | type       | description               |
| ------------------------------------ | ----------------------- | ---------- | ------------------------- |
| `/var/local/syncthing`               | `/config`               | `hostPath` | Application configuration |
| `192.168.50.7:/mnt/nebula/syncthing` | `/mnt/nebula/syncthing` | `nfs`      | Synced data               |
