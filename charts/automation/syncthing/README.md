# `syncthing`

> Continuous file synchronization

Source Code: https://github.com/syncthing/syncthing
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register
kubectl apply -f application.yaml

# Upgrade - via ArgoCD UI or:
argocd app sync syncthing
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install syncthing bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Host Volumes

| hostPath                 | containerPath | description                            |
| ------------------------ | ------------- | -------------------------------------- |
| `/appdata/k3s/syncthing` | `/config`     | Application configuration and database |
| `/mnt/wdata`             | `/mnt/wdata`  | Folder to share with the node          |
