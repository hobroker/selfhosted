# `code-server`

> VS Code running on a remote server, accessible through the browser

Source Code: https://github.com/linuxserver/docker-code-server
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync code-server
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install code-server bjw-s/app-template -f values.yaml
```

## Storage

| source                              | containerPath | description               |
| ----------------------------------- | ------------- | ------------------------- |
| `/var/local/code-server` (hostPath) | `/config`     | Application configuration |
| `/var/local` (hostPath)             | `/var/local`  | Access to all local data  |

PV: `code-server-config-pv` → PVC: `code-server-config-pvc`
PV: `code-server-varlocal-pv` → PVC: `code-server-varlocal-pvc`
