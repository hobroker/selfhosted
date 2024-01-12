# `datadog`

> Docs: https://docs.datadoghq.com/containers/kubernetes/installation/?tab=operator

## Installing/upgrading

```shell
# install the agent
helm upgrade --install datadog-operator datadog/datadog-operator --namespace monitoring
kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY> --namespace monitoring

# configure the agent
kubectl apply -f monitoring/datadog/datadog-agent.yaml --namespace monitoring
```

## Extra configmap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: datadog-extra-configmap
  namespace: monitoring
data:
  mysql.yaml: |-
    ad_identifiers:
      - mysql
    init_config:
    instances:
      - host: "xxx.biomarkers.svc.cluster.local"
        port: 3306
        username: "datadog"
        password: "password"
```
