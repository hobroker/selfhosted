# Selfhosted

My selfhosted services

## Setup

1. Install k3s https://docs.k3s.io/installation

## Apps

### Automation

| Chart                                    | Description                                                 | Source Code                            |
| ---------------------------------------- | ----------------------------------------------------------- | -------------------------------------- |
| [apprise](charts/automation/apprise)     | Push Notifications that work with just about every platform | https://github.com/caronc/apprise      |
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
| [wakatime-exporter](charts/monitoring/wakatime-exporter)     | Exports Prometheus metrics from Wakatime.                                           | https://github.com/MacroPower/wakatime_exporter            |

### System

| Chart                                                  | Description                                                               | Source Code                                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------- | -------------------------------------------- | --- |
| [cert-manager](charts/system/cert-manager)             | Automatically provision and manage TLS certificates in K8s                | https://github.com/cert-manager/cert-manager |
| [infisical-operator](charts/system/infisical-operator) | Operator to fetch secrets from Infisical.                                 | https://github.com/Infisical/infisical       |
| [rancher](charts/system/rancher)                       | Container management platform                                             | https://github.com/rancher/rancher           |
| [reloader](charts/system/reloader)                     | K8s controller to that does rolling upgrades on ConfigMap/Secrets changes | https://github.com/stakater/Reloader         |
| [traefik](charts/system/traefik)                       | HTTP reverse proxy and load balancer                                      | https://github.com/traefik/traefik           | --- |

## References

- [K3s](https://k3s.io/) - Lightweight Kubernetes

---

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg)](https://www.buymeacoffee.com/hobroker)
