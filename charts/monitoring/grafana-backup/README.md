# `grafana-backup`

> Cron job to backup Grafana settings by using the Grafana API

Source Code: https://github.com/ysde/grafana-backup-tool

## Installing/upgrading

```shell
kubectl apply -f config/

helmfile apply
```

### Secrets

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
