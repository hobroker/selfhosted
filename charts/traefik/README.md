About `traefik`
===
Repository: https://github.com/traefik/traefik-helm-chart

Installing/updating
===

```shell
helm upgrade --install traefik traefik/traefik --values traefik/values.yaml --namespace=kube-system
```

Helm values
---

| chart     | values.yaml                                                                   |
|-----------|-------------------------------------------------------------------------------|
| `traefik` | https://github.com/traefik/traefik-helm-chart/blob/master/traefik/values.yaml |
