# `traefik`

> HTTP reverse proxy and load balancer

Source Code: https://github.com/traefik/traefik
Chart: https://github.com/traefik/traefik-helm-chart

## Installing/upgrading

```shell
kubectl apply -f config

helmfile apply
```

### Configuration

Update `externalIPs` in `values.yaml` to match your node's IP before deploying:

```yaml
service:
  externalIPs:
    - 192.168.x.x
```

### Helm values

| chart     | values.yaml                                                                   |
| --------- | ----------------------------------------------------------------------------- |
| `traefik` | https://github.com/traefik/traefik-helm-chart/blob/master/traefik/values.yaml |

### Secrets

The following environment variables are required and sourced from the `infisical-traefik-secret`:

| name               | description              |
| ------------------ | ------------------------ |
| `CF_API_EMAIL`     | Cloudflare account email |
| `CF_DNS_API_TOKEN` | Cloudflare DNS API Token |

### Host Volumes

| hostPath                    | containerPath | description                                 |
| --------------------------- | ------------- | ------------------------------------------- |
| `/appdata/k3s/traefik/acme` | `/acme`       | Storage for ACME certificates (letsencrypt) |
