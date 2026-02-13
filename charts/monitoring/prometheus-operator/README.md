# `prometheus-operator`

> Operator that manages Prometheus, Grafana, and related monitoring components in K8s

Source Code: https://github.com/prometheus-operator/prometheus-operator
Chart: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack

## Installing/upgrading

```shell
helmfile apply
```

### Helm values

| chart                 | values.yaml                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| `prometheus-operator` | https://github.com/prometheus-community/helm-charts/blob/main/charts/kube-prometheus-stack/values.yaml |
| `grafana`             | https://github.com/grafana/helm-charts/blob/main/charts/grafana/values.yaml                            |

### Persistence

- **Prometheus**: Uses `local-path-retain` storage class (5Gi) for metrics retention.
- **Grafana**: Uses `local-path-retain` storage class (5Gi) for dashboards and user data.
