# `cert-manager`

> Automatically provision and manage TLS certificates in K8s

Source Code: https://github.com/cert-manager/cert-manager
Chart: https://github.com/cert-manager/cert-manager/tree/master/deploy/charts/cert-manager

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync cert-manager
```

### Manual Helm (without ArgoCD)

```sh
helm repo add jetstack https://charts.jetstack.io
helm repo update jetstack
helm upgrade --install cert-manager jetstack/cert-manager \
  --namespace cert-manager --create-namespace \
  -f values.yaml
```

### Helm values

| chart          | values.yaml                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------- |
| `cert-manager` | https://github.com/cert-manager/cert-manager/blob/master/deploy/charts/cert-manager/values.yaml |
