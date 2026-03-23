# Selfhosted

Run your own media server, backups, monitoring, automation, and more — on hardware you control. This repository contains a collection of self-hosted apps, deployable on any Kubernetes cluster via [Helm](https://helm.sh/) or [ArgoCD](https://argo-cd.readthedocs.io/).

> [!NOTE]
> **Personal Setup:** This repository reflects a personal homelab setup. Domains, host paths, and secret names are specific to this environment. If you're adapting it for your own use, update the `values.yaml` in each app you deploy.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Set up a Kubernetes cluster](#1-set-up-a-kubernetes-cluster)
  - [2. Clone this repo](#2-clone-this-repo)
  - [3. Bootstrap ArgoCD (optional)](#3-bootstrap-argocd-optional)
  - [4. Deploy an app](#4-deploy-an-app)
- [How It Works](#how-it-works)
- [Deploy Order](#deploy-order)
- [Host Directories](#host-directories)
- [Secrets](#secrets)
- [Deploying an App](#deploying-an-app)
- [Docs Generation](#docs-generation)
- [Apps](#apps)
  - [Automation](#automation)
  - [Backup](#backup)
  - [Development](#development)
  - [Media](#media)
  - [Monitoring](#monitoring)
  - [Network](#network)
  - [System](#system)
- [Troubleshooting](#troubleshooting)
- [References](#references)
- [Contributing](#contributing)

## Prerequisites

- A Kubernetes cluster (any distribution — [Talos](https://www.talos.dev/), [k3s](https://k3s.io/), etc.)
- [Helm](https://helm.sh/docs/intro/install/) — Kubernetes package manager
- [kubectl](https://kubernetes.io/docs/tasks/tools/) — Kubernetes CLI
- [ArgoCD](https://argo-cd.readthedocs.io/en/stable/getting_started/) — optional GitOps controller (see [apps/system/argocd](apps/system/argocd))
- [Node.js](https://nodejs.org/) + npm — optional, for [generating docs](#docs-generation)

## Getting Started

### 1. Set up a Kubernetes cluster

Bring up any Kubernetes cluster and export a working kubeconfig. If this is your first cluster, [k3s](https://k3s.io/) is the easiest way to start:

```shell
curl -sfL https://get.k3s.io | sh -
```

[Talos](https://www.talos.dev/), kind, and other distributions work just as well.

### 2. Clone this repo

```
git clone https://github.com/hobroker/selfhosted.git
cd selfhosted
```

### 3. Bootstrap ArgoCD (optional)

ArgoCD watches this Git repo and automatically syncs changes to your cluster — no manual `helm install` needed. It also provides a web UI to monitor and manage all your deployments. See [apps/system/argocd](apps/system/argocd) for bootstrap instructions.

### 4. Deploy an app

Pick an app and follow its `README.md` — each one includes instructions for both ArgoCD and plain Helm deployment. For example, to deploy [Syncthing](apps/backup/syncthing):

```shell
# With ArgoCD
kubectl apply -f apps/backup/syncthing/application.yaml

# Or with Helm directly
helm install syncthing apps/backup/syncthing
```

See [Deploying an App](#deploying-an-app) for more details.

## How It Works

> [!NOTE]
> Git push → ArgoCD detects changes → sync applies Helm manifests to the cluster → Traefik routes traffic → App reachable

Most apps are packaged as Helm charts. ArgoCD watches this repo and continuously syncs chart/manifests to your cluster. Traefik acts as the reverse proxy, routing incoming requests to the right app based on domain/path rules. Infisical injects secrets into pods at deploy time.

This is a simplified flow: external access depends on your ingress config, DNS, and (if enabled) TLS setup.

If you're not using ArgoCD, you can deploy any app directly with `helm install` — the Helm values work the same either way.

## Deploy Order

System apps must be synced before any other apps. ArgoCD sync-wave annotations handle ordering automatically when syncing all at once. If syncing manually, use this order:

1. [local-path-provisioner](apps/system/local-path-provisioner) — persistent storage class
2. [traefik](apps/system/traefik) — ingress / reverse proxy
3. [infisical-operator](apps/system/infisical-operator) — secret injection
4. [reloader](apps/system/reloader) — rolling restarts on config/secret changes
5. Apps (any order)

## Host Directories

Apps use host-mounted volumes for persistent data. The paths are defined in each app's `config/pv.yaml` and must exist on the host before deploying.

The defaults below reflect this homelab's setup — update them to match your own environment:

- `/var/local/<app>` — per-app config and database (hostPath on the node)
- `/mnt/nebula` — media library (movies, TV shows, downloads), mounted via NFS

To customize paths, edit the `config/pv.yaml` in each app you deploy.

A custom `StorageClass` with a `Retain` reclaim policy is also available to prevent data loss when PVCs are deleted — see [local-path-provisioner](apps/system/local-path-provisioner).

## Secrets

Secrets are managed via [Infisical](https://infisical.com/) using the [infisical-operator](apps/system/infisical-operator). Each app's `README.md` lists the required secrets and the Infisical secret name they are sourced from.

If you don't use Infisical, you can create Kubernetes Secrets manually — just make sure the Secret names and keys match what each app's templates expect.

## Deploying an App

Before deploying any app, review its `values.yaml` and update domains, paths, and other environment-specific values to match your setup. Some apps contain hardcoded domains (e.g. `jellyfin.hobroker.me`) that must be changed.

Each app's `README.md` includes instructions for both **ArgoCD** and **plain Helm** deployment, along with any extra steps required (secrets, host volumes, config files).

**Quick start with ArgoCD:**

```sh
kubectl apply -f apps/<category>/<name>/application.yaml
```

Then sync it in the ArgoCD UI or with `argocd app sync <name>`.

## Docs Generation

The [Apps](#apps) tables in this README are auto-generated from app metadata. To regenerate them after adding or updating an app:

```shell
npm run generate
```

## Apps

<!-- apps:start -->

### Automation

| App                                  | Description                                                                       | Source Code                            |
| ------------------------------------ | --------------------------------------------------------------------------------- | -------------------------------------- |
| [n8n](apps/automation/n8n)           | Workflow automation platform                                                      | <https://github.com/n8n-io/n8n>        |
| [openclaw](apps/automation/openclaw) | AI assistant that connects to messaging platforms and executes tasks autonomously | <https://github.com/openclaw/openclaw> |

### Backup

| App                                | Description                                             | Source Code                                |
| ---------------------------------- | ------------------------------------------------------- | ------------------------------------------ |
| [backrest](apps/backup/backrest)   | A web-accessible backup solution built on top of restic | <https://github.com/garethgeorge/backrest> |
| [syncthing](apps/backup/syncthing) | Continuous file synchronization                         | <https://github.com/syncthing/syncthing>   |

### Development

| App                                                 | Description                                                        | Source Code                                         |
| --------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------- |
| [code-server](apps/development/code-server)         | VS Code running on a remote server, accessible through the browser | <https://github.com/linuxserver/docker-code-server> |
| [http-https-echo](apps/development/http-https-echo) | App that echoes request data as JSON (useful for debugging)        | <https://github.com/mendhak/docker-http-https-echo> |

### Media

| App                                     | Description                                                                               | Source Code                                    |
| --------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------- |
| [bazarr](apps/media/bazarr)             | Companion application to Sonarr and Radarr that manages and downloads subtitles.          | <https://github.com/morpheus65535/bazarr>      |
| [fileflows](apps/media/fileflows)       | File processing application                                                               | <https://github.com/revenz/FileFlows>          |
| [flaresolverr](apps/media/flaresolverr) | Proxy server to bypass Cloudflare protection                                              | <https://github.com/FlareSolverr/FlareSolverr> |
| [jellyfin](apps/media/jellyfin)         | An open-source media server                                                               | <https://github.com/jellyfin/jellyfin>         |
| [plex](apps/media/plex)                 | A media server that organizes and streams video and audio content across devices.         | <https://www.plex.tv/>                         |
| [prowlarr](apps/media/prowlarr)         | Indexer manager/proxy built on the popular \*arr stack to integrate with various PVR apps | <https://github.com/Prowlarr/Prowlarr>         |
| [qbittorrent](apps/media/qbittorrent)   | Bittorrent client with a feature rich Web UI for remote access                            | <https://github.com/qbittorrent/qBittorrent>   |
| [radarr](apps/media/radarr)             | A movie tracking and automation tool that downloads movies as they become available.      | <https://github.com/Radarr/Radarr>             |
| [recyclarr](apps/media/recyclarr)       | Automatically sync TRaSH Guide settings to Radarr and Sonarr.                             | <https://github.com/recyclarr/recyclarr>       |
| [seerr](apps/media/seerr)               | A modern media request and discovery tool.                                                | <https://github.com/seerr-team/seerr>          |
| [sonarr](apps/media/sonarr)             | A TV series tracking and automation tool for downloading episodes as they air.            | <https://github.com/Sonarr/Sonarr>             |
| [tautulli](apps/media/tautulli)         | A monitoring and analytics tool for Plex                                                  | <https://github.com/Tautulli/Tautulli>         |
| [threadfin](apps/media/threadfin)       | An M3U proxy for Kernel/Plex/Jellyfin/Emby based on xTeVe                                 | <https://github.com/Threadfin/Threadfin>       |

### Monitoring

| App                                                        | Description                                                                         | Source Code                                                  |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [grafana-backup](apps/monitoring/grafana-backup)           | Cron job to backup Grafana settings by using the Grafana API                        | <https://github.com/ysde/grafana-backup-tool>                |
| [prometheus-operator](apps/monitoring/prometheus-operator) | Operator that manages Prometheus, Grafana, and related monitoring components in K8s | <https://github.com/prometheus-operator/prometheus-operator> |
| [scraparr](apps/monitoring/scraparr)                       | Prometheus Exporter for various components of the \*arr Suite.                      | <https://github.com/thecfu/scraparr>                         |

### Network

| App                                     | Description                                      | Source Code                                  |
| --------------------------------------- | ------------------------------------------------ | -------------------------------------------- |
| [adguardhome](apps/network/adguardhome) | A network-wide DNS ad blocker and privacy filter | <https://github.com/AdguardTeam/AdGuardHome> |

### System

| App                                                          | Description                                                                                    | Source Code                                         |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [argocd](apps/system/argocd)                                 | Declarative GitOps CD for Kubernetes                                                           | <https://github.com/argoproj/argo-cd>               |
| [cert-manager](apps/system/cert-manager)                     | Automatically provision and manage TLS certificates in K8s                                     | <https://github.com/cert-manager/cert-manager>      |
| [infisical-operator](apps/system/infisical-operator)         | Operator to fetch secrets from Infisical.                                                      | <https://github.com/Infisical/infisical>            |
| [local-path-provisioner](apps/system/local-path-provisioner) | Local path provisioner with a Retain storage class for persistent storage on node local disks. | <https://github.com/rancher/local-path-provisioner> |
| [longhorn](apps/system/longhorn)                             | Cloud-native distributed block storage for Kubernetes.                                         | <https://github.com/longhorn/longhorn>              |
| [metallb](apps/system/metallb)                               | Layer 2 load balancer for bare-metal Kubernetes clusters                                       | <https://github.com/metallb/metallb>                |
| [rancher](apps/system/rancher)                               | Container management platform                                                                  | <https://github.com/rancher/rancher>                |
| [reloader](apps/system/reloader)                             | K8s controller that triggers rolling upgrades when ConfigMaps or Secrets change                | <https://github.com/stakater/Reloader>              |
| [traefik](apps/system/traefik)                               | HTTP reverse proxy and load balancer                                                           | <https://github.com/traefik/traefik>                |

<!-- apps:end -->

---

## Troubleshooting

- **Pod stuck in `Pending`** — check that the PersistentVolume exists and the host directory has been created (`kubectl describe pod <name>` will show the exact error)
- **ArgoCD sync failed** — run `argocd app get <name>` or check the ArgoCD UI for error details
- **Ingress not reachable** — verify Traefik is running (`kubectl get pods -n traefik`) and that your domain's DNS points to the cluster's external IP
- **Secrets missing** — ensure the Infisical operator is synced, or create the required Kubernetes Secrets manually (check the app's `README.md` for the expected Secret names)

## References

- [Helm docs](https://helm.sh/docs/) — Kubernetes package manager documentation
- [kubectl cheat sheet](https://kubernetes.io/docs/reference/kubectl/quick-reference/) — quick reference for common commands
- [k3s](https://k3s.io/) — lightweight Kubernetes distribution
- [Talos Linux](https://www.talos.dev/) — Kubernetes-focused Linux
- [ArgoCD](https://argo-cd.readthedocs.io/) — GitOps continuous delivery
- [Infisical](https://infisical.com/) — Secret management

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

If you find this useful:

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg)](https://www.buymeacoffee.com/hobroker)
