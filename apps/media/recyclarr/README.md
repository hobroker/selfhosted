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

## Storage

| Name     | Source                 | Container Path | Size |
| -------- | ---------------------- | -------------- | ---- |
| `config` | `/var/local/recyclarr` | `/config`      | 1Gi  |

## Configuration

Edit `config/recyclarr.yml` to customize quality profiles, custom formats, and scoring for Radarr and Sonarr. See the [Recyclarr config reference](https://recyclarr.dev/wiki/yaml/config-reference/) for all available options.

ArgoCD will automatically run a sync job whenever this file changes.
