# `prometheus-operator`

Repository: https://github.com/prometheus-operator/prometheus-operator  
Chart repository: https://github.com/prometheus-operator/prometheus-operator

# Installing/upgrading

```shell
helmfile apply -f metrics/prometheus-operator/helmfile.yaml
```

## Helm values

| chart                 | values.yaml                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| `prometheus-operator` | https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml |
| `grafana`             | https://github.com/grafana/helm-charts/blob/main/charts/grafana/values.yaml                            |
