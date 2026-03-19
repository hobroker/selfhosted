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
kubectl apply -k config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install recyclarr bjw-s/app-template \
  --version 4.6.2 -f values.yaml
```

## Configuration

Edit `config/recyclarr.yml` to customize quality profiles, custom formats, and scoring for Radarr and Sonarr. See the [Recyclarr config reference](https://recyclarr.dev/wiki/yaml/config-reference/) for all available options.

ArgoCD will automatically run a sync job whenever this file changes.

## Storage

| source                            | containerPath | description            |
| --------------------------------- | ------------- | ---------------------- |
| `/var/local/recyclarr` (hostPath) | `/config`     | State, logs, and cache |

`recyclarr.yml` is rendered at runtime by an init container — API keys from `infisical-recyclarr-secret` are substituted into the ConfigMap template.

PV: `recyclarr-config-pv` → PVC: `recyclarr-config-pvc`
