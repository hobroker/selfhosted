# Selfhosted

A collection of Helm charts for self-hosted services running on [k3s](https://k3s.io/) (lightweight Kubernetes), managed with [Helmfile](https://helmfile.readthedocs.io/).

> **Personal Setup:** This repository reflects a personal homelab setup. Domains, host paths, and secret names are all specific to this environment. If you're adapting it for your own use, expect to update `values.yaml` in each chart you deploy.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Install k3s](#1-install-k3s)
  - [2. Clone this repo](#2-clone-this-repo)
  - [3. Deploy a service](#3-deploy-a-service)
- [Deploy Order](#deploy-order)
- [Host Directories](#host-directories)
- [Secrets](#secrets)
- [Deploying a Chart](#deploying-a-chart)
- [Interactive CLI (optional)](#interactive-cli-optional)
- [Docs Generation](#docs-generation)
- [Apps](#apps)
  - [Automation](#automation)
  - [Demo](#demo)
  - [Development](#development)
  - [Downloads](#downloads)
  - [Media](#media)
  - [Monitoring](#monitoring)
  - [System](#system)
- [References](#references)
- [Contributing](#contributing)

## Prerequisites

- [k3s](https://docs.k3s.io/installation) — lightweight Kubernetes cluster
- [Helmfile](https://helmfile.readthedocs.io/en/latest/#installation) — declarative Helm chart management
- [kubectl](https://kubernetes.io/docs/tasks/tools/) — Kubernetes CLI
- [Node.js](https://nodejs.org/) + npm — optional, for the interactive CLI

## Getting Started

### 1. Install k3s

Follow the [k3s Quick Start](https://docs.k3s.io/quick-start).

### 2. Clone this repo

```shell
git clone https://github.com/hobroker/selfhosted.git
cd selfhosted
```

### 3. Deploy a service

Navigate to any chart directory and run `helmfile apply`. See [Deploying a Chart](#deploying-a-chart) for details.

## Deploy Order

System charts must be deployed before any app charts. A typical bootstrap order:

1. [cert-manager](charts/system/cert-manager) — TLS certificate management
2. [traefik](charts/system/traefik) — ingress / reverse proxy
3. [infisical-operator](charts/system/infisical-operator) — secret injection
4. [reloader](charts/system/reloader) — rolling restarts on config/secret changes
5. App charts (any order)

## Host Directories

Charts use host-mounted volumes for persistent data. The paths are hardcoded in each chart's `values.yaml` and must exist on the host before deploying. Common ones:

- `/appdata/k3s/<service>` — per-service config and database
- `/mnt/nebula` — media library (movies, TV shows, downloads)

A custom `StorageClass` with a `Retain` reclaim policy is also available to prevent data loss when PVCs are deleted:

```shell
kubectl apply -f charts/system/local-path-retain.yaml
```

## Secrets

Secrets are managed via [Infisical](https://infisical.com/) using the [infisical-operator](charts/system/infisical-operator). Each chart's `README.md` lists the required secrets and the Infisical secret name they are sourced from.

## Deploying a Chart

Deploying a chart is usually just:

```shell
cd charts/<category>/<name>
helmfile apply
```

Each chart's `values.yaml` contains a hardcoded domain (e.g. `jellyfin.hobroker.me`) — update it to your own domain before deploying. Some charts also require extra steps (config files, secrets, host volumes) — check the chart's `README.md` for details.

## Interactive CLI (optional)

An interactive terminal UI is available for browsing and managing services:

```shell
npm install
npm run cli
```

## Docs Generation

The [Apps](#apps) tables in this README are auto-generated from chart metadata. To regenerate them after adding or updating a chart:

```shell
npm run generate
```

## Apps

<!-- apps:start -->

### Automation

| Chart                                    | Description                                                 | Source Code                            |
| ---------------------------------------- | ----------------------------------------------------------- | -------------------------------------- |
| [apprise](charts/automation/apprise)     | Push Notifications that work with just about every platform | https://github.com/caronc/apprise      |
| [fileflows](charts/automation/fileflows) | File processing application                                 | https://github.com/revenz/FileFlows    |
| [n8n](charts/automation/n8n)             | Workflow automation platform                                | https://github.com/n8n-io/n8n          |
| [rsnapshot](charts/automation/rsnapshot) | A tool for backing up data using rsync                      | https://github.com/rsnapshot/rsnapshot |
| [syncthing](charts/automation/syncthing) | Continuous file synchronization                             | https://github.com/syncthing/syncthing |

### Demo

| Chart                                          | Description                                                 | Source Code                                       |
| ---------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------- |
| [http-https-echo](charts/demo/http-https-echo) | App that echoes request data as JSON (useful for debugging) | https://github.com/mendhak/docker-http-https-echo |

### Development

| Chart                                         | Description                                                        | Source Code                                       |
| --------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------- |
| [code-server](charts/development/code-server) | VS Code running on a remote server, accessible through the browser | https://github.com/linuxserver/docker-code-server |

### Downloads

| Chart                                         | Description                                                                               | Source Code                                  |
| --------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------- |
| [flaresolverr](charts/downloads/flaresolverr) | Proxy server to bypass Cloudflare protection                                              | https://github.com/FlareSolverr/FlareSolverr |
| [prowlarr](charts/downloads/prowlarr)         | Indexer manager/proxy built on the popular \*arr stack to integrate with various PVR apps | https://github.com/Prowlarr/Prowlarr         |
| [qbittorrent](charts/downloads/qbittorrent)   | Bittorrent client with a feature rich Web UI for remote access                            | https://github.com/qbittorrent/qBittorrent   |

### Media

| Chart                               | Description                                                                          | Source Code                             |
| ----------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------- |
| [bazarr](charts/media/bazarr)       | Companion application to Sonarr and Radarr that manages and downloads subtitles.     | https://github.com/morpheus65535/bazarr |
| [jellyfin](charts/media/jellyfin)   | An open-source media server                                                          | https://github.com/jellyfin/jellyfin    |
| [overseerr](charts/media/overseerr) | A tool for browsing and requesting new media content.                                | https://github.com/sct/overseerr        |
| [plex](charts/media/plex)           | A media server that organizes and streams video and audio content across devices.    | https://www.plex.tv/                    |
| [radarr](charts/media/radarr)       | A movie tracking and automation tool that downloads movies as they become available. | https://github.com/Radarr/Radarr        |
| [sonarr](charts/media/sonarr)       | A TV series tracking and automation tool for downloading episodes as they air.       | https://github.com/Sonarr/Sonarr        |
| [tautulli](charts/media/tautulli)   | A monitoring and analytics tool for Plex                                             | https://github.com/Tautulli/Tautulli    |
| [threadfin](charts/media/threadfin) | An M3U proxy for Kernel/Plex/Jellyfin/Emby based on xTeVe                            | https://github.com/Threadfin/Threadfin  |

### Monitoring

| Chart                                                        | Description                                                                         | Source Code                                                |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [grafana-backup](charts/monitoring/grafana-backup)           | Cron job to backup Grafana settings by using the Grafana API                        | https://github.com/ysde/grafana-backup-tool                |
| [prometheus-operator](charts/monitoring/prometheus-operator) | Operator that manages Prometheus, Grafana, and related monitoring components in K8s | https://github.com/prometheus-operator/prometheus-operator |
| [scraparr](charts/monitoring/scraparr)                       | Prometheus Exporter for various components of the \*arr Suite.                      | https://github.com/thecfu/scraparr                         |
| [wakatime-exporter](charts/monitoring/wakatime-exporter)     | Exports Prometheus metrics from Wakatime.                                           | https://github.com/MacroPower/wakatime_exporter            |

### System

| Chart                                                  | Description                                                               | Source Code                                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------- | -------------------------------------------- |
| [cert-manager](charts/system/cert-manager)             | Automatically provision and manage TLS certificates in K8s                | https://github.com/cert-manager/cert-manager |
| [infisical-operator](charts/system/infisical-operator) | Operator to fetch secrets from Infisical.                                 | https://github.com/Infisical/infisical       |
| [rancher](charts/system/rancher)                       | Container management platform                                             | https://github.com/rancher/rancher           |
| [reloader](charts/system/reloader)                     | K8s controller to that does rolling upgrades on ConfigMap/Secrets changes | https://github.com/stakater/Reloader         |
| [traefik](charts/system/traefik)                       | HTTP reverse proxy and load balancer                                      | https://github.com/traefik/traefik           |

<!-- apps:end -->

---

## References

- [k3s](https://k3s.io/) — Lightweight Kubernetes
- [Helmfile](https://helmfile.readthedocs.io/) — Declarative Helm chart management
- [Infisical](https://infisical.com/) — Secret management

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg)](https://www.buymeacoffee.com/hobroker)
