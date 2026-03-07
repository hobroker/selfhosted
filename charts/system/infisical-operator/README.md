# `infisical-operator`

> Operator to fetch secrets from Infisical.

Source Code: https://github.com/Infisical/infisical
Chart: https://github.com/Infisical/infisical/tree/main/helm-charts/secrets-operator

## Installing/upgrading

```sh
# Register (first time)
kubectl apply -f application.yaml

# Upgrade - bump targetRevision in application.yaml, then sync via ArgoCD UI or:
argocd app sync infisical-operator
```

### Manual Helm (without ArgoCD)

```sh
kubectl create secret generic universal-auth-credentials \
  --from-literal=clientId="<clientId>" \
  --from-literal=clientSecret="<clientSecret>" \
  -n infisical-operator-system
kubectl apply -f config/
helm repo add infisical-helm-charts https://dl.cloudsmith.io/public/infisical/helm-charts/helm/charts/
helm repo update infisical-helm-charts
helm upgrade --install infisical infisical-helm-charts/secrets-operator \
  --namespace infisical-operator-system --create-namespace \
  -f values.yaml
```

### Secrets

| name                         | description                                                             |
| ---------------------------- | ----------------------------------------------------------------------- |
| `universal-auth-credentials` | Credentials used by the operator to authenticate with the Infisical API |
