# `overseerr`

> A tool for browsing and requesting new media content.

Source Code: https://github.com/sct/overseerr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync overseerr
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config/pv.yaml
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install overseerr bjw-s/app-template \
  --namespace default --create-namespace \
  -f values.yaml
```

## Storage

| source                            | containerPath | description                            |
| --------------------------------- | ------------- | -------------------------------------- |
| `/var/local/overseerr` (hostPath) | `/config`     | Application configuration and database |

PV: `overseerr-config-pv` → PVC: `overseerr-config-pvc`
