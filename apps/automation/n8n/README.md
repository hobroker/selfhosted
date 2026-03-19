# `n8n`

> Workflow automation platform

Source Code: https://github.com/n8n-io/n8n
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync n8n
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install n8n bjw-s/app-template \
  --version 4.6.2 -f values.yaml
```

## Storage

| source                      | containerPath     | description                            |
| --------------------------- | ----------------- | -------------------------------------- |
| `/var/local/n8n` (hostPath) | `/home/node/.n8n` | Application configuration and database |

PV: `n8n-config-pv` → PVC: `n8n-config-pvc`
