# `code-server`

> VS Code running on a remote server, accessible through the browser

Source Code: https://github.com/linuxserver/docker-code-server
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register
kubectl apply -f application.yaml

# Upgrade - via ArgoCD UI or:
argocd app sync code-server
```

### Manual Helm (without ArgoCD)

```sh
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install code-server bjw-s/app-template \
  --namespace self --create-namespace \
  -f values.yaml
```

### Host Volumes

| hostPath                   | containerPath           | description                             |
| -------------------------- | ----------------------- | --------------------------------------- |
| `/appdata/k3s/code-server` | `/config`               | Application configuration and user data |
| `/appdata`                 | `/appdata`              | Access to application data directory    |
| `/mnt/nebula/downloads`    | `/mnt/nebula/downloads` | Access to downloads directory           |
| `/storage/ww`              | `/storage/ww`           | Access to external storage              |
| `/home/kira/.openclaw`     | `/home/kira/.openclaw`  | Access to openclaw config directory     |
