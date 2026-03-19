# `traefik`

> HTTP reverse proxy and load balancer

Source Code: https://github.com/traefik/traefik
Chart: https://github.com/traefik/traefik-helm-chart

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync traefik
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add traefik https://helm.traefik.io/traefik
helm repo update traefik
helm upgrade --install traefik traefik/traefik \
  --version 39.0.2 --namespace kube-system --create-namespace \
  -f values.yaml
```

## Storage

| source                    | container path | type       | description                                 |
| ------------------------- | -------------- | ---------- | ------------------------------------------- |
| `/var/local/traefik/acme` | `/acme`        | `hostPath` | Storage for ACME certificates (letsencrypt) |

PV: `traefik-acme-pv` → PVC: `traefik-acme-pvc`
