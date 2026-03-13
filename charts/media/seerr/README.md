# `seerr`

> A modern media request and discovery tool.

Source Code: https://github.com/seerr-team/seerr
Chart: oci://ghcr.io/seerr-team/seerr/seerr-chart

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync seerr
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config/pv.yaml
helm upgrade --install seerr oci://ghcr.io/seerr-team/seerr/seerr-chart \
  --namespace default --create-namespace \
  -f values.yaml
```

## Storage

| source                        | containerPath | description                            |
| ----------------------------- | ------------- | -------------------------------------- |
| `/var/local/seerr` (hostPath) | `/config`     | Application configuration and database |

PV: `seerr-config-pv` → PVC: `seerr-config-pvc`
