# `grafana-backup`

> Cron job to backup Grafana settings by using the Grafana API

Source Code: https://github.com/ysde/grafana-backup-tool
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync grafana-backup
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install grafana-backup bjw-s/app-template \
  --namespace monitoring --create-namespace \
  -f values.yaml
```

### Secrets

The following environment variables are required and sourced from the `infisical-grafana-backup-secret`:

| name                     | description                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `AWS_ACCESS_KEY_ID`      | AWS access key ID                                                                             |
| `AWS_ENDPOINT_URL`       | AWS endpoint URL                                                                              |
| `AWS_S3_BUCKET_KEY`      | AWS S3 bucket key (folder)                                                                    |
| `AWS_S3_BUCKET_NAME`     | AWS S3 bucket name                                                                            |
| `AWS_SECRET_ACCESS_KEY`  | AWS secret access key                                                                         |
| `GRAFANA_ADMIN_ACCOUNT`  | Grafana admin account                                                                         |
| `GRAFANA_ADMIN_PASSWORD` | Grafana admin password                                                                        |
| `GRAFANA_TOKEN`          | [Grafana API token](https://grafana.com/docs/grafana/latest/administration/service-accounts/) |
