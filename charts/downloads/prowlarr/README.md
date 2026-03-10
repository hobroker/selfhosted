# `prowlarr`

> Indexer manager/proxy built on the popular \*arr stack to integrate with various PVR apps

Source Code: https://github.com/Prowlarr/Prowlarr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync prowlarr
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config/pv.yaml
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm upgrade --install prowlarr bjw-s/app-template \
  --namespace default --create-namespace \
  -f values.yaml
```

## Storage

| hostPath              | containerPath | description                            |
| --------------------- | ------------- | -------------------------------------- |
| `/var/local/prowlarr` | `/config`     | Application configuration and database |

PV: `prowlarr-config-pv` (1Gi, Retain) → PVC: `prowlarr-config-pvc` in namespace `default`
