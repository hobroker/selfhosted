About `traefik`
===
> Repository: https://github.com/traefik/traefik-helm-chart

Installing/updating
===

```shell
# Install Traefik Resource Definitions
kubectl apply -f https://raw.githubusercontent.com/traefik/traefik/v2.10/docs/content/reference/dynamic-configuration/kubernetes-crd-definition-v1.yml

# Install RBAC for Traefik
kubectl apply -f https://raw.githubusercontent.com/traefik/traefik/v2.10/docs/content/reference/dynamic-configuration/kubernetes-crd-rbac.yml

$ Install Traefik
helm upgrade --install traefik traefik/traefik -f network/traefik/values.yaml --namespace=kube-system
```

### Middlewares
```shell
kubectl apply -f network/traefik/middlewares/gzip-middleware.yaml
```

Helm values
---

| chart     | values.yaml                                                                   |
|-----------|-------------------------------------------------------------------------------|
| `traefik` | https://github.com/traefik/traefik-helm-chart/blob/master/traefik/values.yaml |
