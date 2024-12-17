# Selfhosted

My selfhosted services

## Setup

1. Install k3s https://docs.k3s.io/installation

## Apps

### Automation

| Chart                                    | Description                                                               | Source Code                            |
| ---------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------- |
| [apprise](charts/automation/apprise)     | Push Notifications that work with just about every platform               | https://github.com/caronc/apprise      |
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

### Media

| Chart                               | Description                                                                                           | Source Code                                            |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| [bazarr](charts/media/bazarr)       | Companion application to Sonarr and Radarr that manages and downloads subtitles                       | https://github.com/morpheus65535/bazarr                |
| [jellyfin](charts/media/jellyfin)   | Software Media System                                                                                 | https://bjw-s.github.io/helm-charts/docs/app-template/ |
| [overseerr](charts/media/overseerr) | A management tool for browsing and requesting new media content.                                      | https://github.com/sct/overseerr                       |
| [plex](charts/media/plex)           | A comprehensive media server that organizes and streams video and audio content across devices.       |                                                        |
| [radarr](charts/media/radarr)       | A movie tracking and automation tool that downloads movies as they become available.                  | https://github.com/Radarr/Radarr                       |
| [sonarr](charts/media/sonarr)       | A TV series tracking and automation tool for downloading episodes as they air.                        | https://github.com/Sonarr/Sonarr                       |
| [tautulli](charts/media/tautulli)   | A monitoring and analytics tool for Plex Media Servers, providing detailed usage statistics and logs. | https://github.com/Tautulli/Tautulli                   |
| [threadfin](charts/media/threadfin) | An M3U proxy for Kernel/Plex/Jellyfin/Emby based on xTeVe                                             | https://github.com/Threadfin/Threadfin                 |

### Monitoring

| Chart                                                        | Description | Source Code |
| ------------------------------------------------------------ | ----------- | ----------- |
| [adguard-exporter](charts/monitoring/adguard-exporter)       |             |             |
| [prometheus-operator](charts/monitoring/prometheus-operator) |             |             |
| [wakatime-exporter](charts/monitoring/wakatime-exporter)     |             |             |

### System

| Chart                            | Description                                                                              | Source Code                        |
| -------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------- |
| [vault](charts/system/stakater)  | A tool for secrets management, encryption as a service, and privileged access management | https://github.com/hashicorp/vault |
| [traefik](charts/system/traefik) |                                                                                          |                                    |---

## References

- [K3s](https://k3s.io/) - Lightweight Kubernetes

---

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg)](https://www.buymeacoffee.com/hobroker)
