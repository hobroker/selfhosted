# Selfhosted

My selfhosted services

## Setup

1. Install k3s https://docs.k3s.io/installation

## Apps

### Automation

| Chart                                    | Description                                                               | Source Code                            |
| ---------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------- |
| [apprise](charts/automation/apprise)     | Push Notifications that work with just about every platform               | https://github.com/caronc/apprise      |
| [messenger](charts/automation/messenger) | A tool for sending messages to Telegram                                   | https://github.com/hobroker/messenger  |
| [olivetin](charts/automation/olivetin)   | Safe and simple access to predefined shell commands from a web interface. | https://github.com/OliveTin/OliveTin   |
| [rsnapshot](charts/automation/rsnapshot) | A tool for backing up your data using rsync                               | https://github.com/rsnapshot/rsnapshot |
| [syncthing](charts/automation/syncthing) | Open Source Continuous File Synchronization                               | https://github.com/syncthing/syncthing |

### Demo

| Chart                                          | Description                                                          | Source Code                                       |
| ---------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| [http-https-echo](charts/demo/http-https-echo) | Docker image that echoes request data as JSON (useful for debugging) | https://github.com/mendhak/docker-http-https-echo |

### Development

| Chart                                         | Description                                                         | Source Code                                       |
| --------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------- |
| [code-server](charts/development/code-server) | VS Code running on a remote server, accessible through the browser. | https://github.com/linuxserver/docker-code-server |

### Downloads

| Chart                                         | Description                                                                              | Source Code                                  |
| --------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------- |
| [flaresolverr](charts/downloads/flaresolverr) | Proxy server to bypass Cloudflare protection                                             | https://github.com/FlareSolverr/FlareSolverr |
| [prowlarr](charts/downloads/prowlarr)         | Indexer manager/proxy built on the popular *arr stack to integrate with various PVR apps | https://github.com/Prowlarr/Prowlarr         |
| [qbittorrent](charts/downloads/qbittorrent)   | Free cross-platform bittorrent client with a feature rich Web UI for remote access.      | https://github.com/qbittorrent/qBittorrent   |

### Home

| Chart                                        | Description | Source Code |
| -------------------------------------------- | ----------- | ----------- |
| [home-assistant](charts/home/home-assistant) |             |             |
| [zigbee2mqtt](charts/home/zigbee2mqtt)       |             |             |

### Media

| Chart                               | Description                                               | Source Code |
| ----------------------------------- | --------------------------------------------------------- | ----------- |
| [bazarr](charts/media/bazarr)       |                                                           |             |
| [jellyfin](charts/media/jellyfin)   |                                                           |             |
| [overseerr](charts/media/overseerr) |                                                           |             |
| [plex](charts/media/plex)           |                                                           |             |
| [radarr](charts/media/radarr)       |                                                           |             |
| [sonarr](charts/media/sonarr)       |                                                           |             |
| [tautulli](charts/media/tautulli)   |                                                           |             |
| [threadfin](charts/media/threadfin) | An M3U proxy for Kernel/Plex/Jellyfin/Emby based on xTeVe |             |

### Monitoring

| Chart                                                        | Description | Source Code |
| ------------------------------------------------------------ | ----------- | ----------- |
| [adguard-exporter](charts/monitoring/adguard-exporter)       |             |             |
| [datadog](charts/monitoring/datadog)                         |             |             |
| [loki](charts/monitoring/loki)                               |             |             |
| [open-telemetry](charts/monitoring/open-telemetry)           |             |             |
| [prometheus-operator](charts/monitoring/prometheus-operator) |             |             |
| [tempo](charts/monitoring/tempo)                             |             |             |
| [wakatime-exporter](charts/monitoring/wakatime-exporter)     |             |             |

### Secrets

| Chart                         | Description                                                                              | Source Code                        |
| ----------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------- |
| [vault](charts/secrets/vault) | A tool for secrets management, encryption as a service, and privileged access management | https://github.com/hashicorp/vault |

### Storage

| Chart                         | Description                                                                              | Source Code                    |
| ----------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------ |
| [minio](charts/storage/minio) | A tool for secrets management, encryption as a service, and privileged access management | https://github.com/minio/minio |

### System

| Chart                            | Description                                                                              | Source Code                         |
| -------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------- |
| [argo-cd](charts/system/argocd)  | A declarative, GitOps continuous delivery tool for Kubernetes.                           | https://github.com/argoproj/argo-cd |
| [vault](charts/system/stakater)  | A tool for secrets management, encryption as a service, and privileged access management | https://github.com/hashicorp/vault  |
| [traefik](charts/system/traefik) |                                                                                          |                                     |---

## References

- [K3s](https://k3s.io/) - Lightweight Kubernetes

---

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg)](https://www.buymeacoffee.com/hobroker)
