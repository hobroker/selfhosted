---
description: Automatically sync TRaSH Guide settings to Radarr and Sonarr.
sourceCode: https://github.com/recyclarr/recyclarr
chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/
---

## Configuration

Edit `config/recyclarr.yml` to customize quality profiles, custom formats, and scoring for Radarr and Sonarr. See the [Recyclarr config reference](https://recyclarr.dev/wiki/yaml/config-reference/) for all available options.

ArgoCD will automatically run a sync job whenever this file changes.

## Storage

| source                 | container path | type       | description            |
| ---------------------- | -------------- | ---------- | ---------------------- |
| `/var/local/recyclarr` | `/config`      | `hostPath` | State, logs, and cache |

`recyclarr.yml` is rendered at runtime by an init container — API keys from `infisical-recyclarr-secret` are substituted into the ConfigMap template.

PV: `recyclarr-config-pv` → PVC: `recyclarr-config-pvc`
