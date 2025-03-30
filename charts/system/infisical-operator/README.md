# `infisical-operator`

> Operator to fetch secrets from Infisical.

Source Code: https://github.com/Infisical/infisical
Chart: https://github.com/Infisical/infisical/tree/main/helm-charts/secrets-operator

## Installing/upgrading

```shell
kubectl create secret generic universal-auth-credentials --from-literal=clientId="<clientId>" --from-literal=clientSecret="<clientSecret>" -n infisical-operator-system

helmfile apply
```
