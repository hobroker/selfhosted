# `infisical-operator`

> Operator to fetch secrets from Infisical.

Source Code: https://github.com/Infisical/infisical
Chart: https://github.com/Infisical/infisical/tree/main/helm-charts/secrets-operator

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync infisical-operator
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add infisical-helm-charts https://dl.cloudsmith.io/public/infisical/helm-charts/helm/charts/
helm repo update infisical-helm-charts
helm upgrade --install infisical infisical-helm-charts/secrets-operator \
  --version 0.10.25 --namespace infisical-operator-system --create-namespace \
  -f values.yaml
```
