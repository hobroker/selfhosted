# `recyclarr`

> Automatically sync TRaSH Guide settings to Radarr and Sonarr.

Source Code: https://github.com/recyclarr/recyclarr
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync recyclarr
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -k config/
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install recyclarr bjw-s/app-template \
  --namespace default --create-namespace \
  -f values.yaml
```

### Secrets

Add the following to Infisical at path `/recyclarr`:

| key              | description        |
| ---------------- | ------------------ |
| `sonarr_api_key` | API key for Sonarr |
| `radarr_api_key` | API key for Radarr |

## Storage

| source                            | containerPath | description            |
| --------------------------------- | ------------- | ---------------------- |
| `/var/local/recyclarr` (hostPath) | `/config`     | State, logs, and cache |

`recyclarr.yml` is rendered at runtime by an init container — API keys from `infisical-recyclarr-secret` are substituted into the ConfigMap template.

PV: `recyclarr-config-pv` → PVC: `recyclarr-config-pvc`
