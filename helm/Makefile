help: ## Show this help message
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

lint: ## Run linter
	helm lint ./traefik/
	helm lint ./traefik-sso/
	helm lint ./base/ --values code-server.yaml
	helm lint ./base/ --values grafana.yaml
	helm lint ./base/ --values httpbin.yaml
	helm lint ./base/ --values home-assistant.yaml
	helm lint ./base/ --values jackett.yaml
	helm lint ./base/ --values plex.yaml
	helm lint ./base/ --values prometheus.yaml
	helm lint ./base/ --values qbittorrent.yaml
	helm lint ./base/ --values radarr.yaml
	helm lint ./base/ --values sonarr.yaml
	helm lint ./base/ --values syncthing.yaml
	helm lint ./base/ --values tautulli.yaml

update-base: ## Update apps that use base chart
# 	helm upgrade --install httpbin ./base/ --values httpbin.yaml
	helm upgrade --install code-server ./base/ --values code-server.yaml
	helm upgrade --install grafana ./base/ --values grafana.yaml
	helm upgrade --install jackett ./base/ --values jackett.yaml
	helm upgrade --install plex ./base/ --values plex.yaml
	helm upgrade --install qbittorrent ./base/ --values qbittorrent.yaml
	helm upgrade --install radarr ./base/ --values radarr.yaml
	helm upgrade --install sonarr ./base/ --values sonarr.yaml
	helm upgrade --install syncthing ./base/ --values syncthing.yaml
	helm upgrade --install tautulli ./base/ --values tautulli.yaml
	helm upgrade --install wakatime-exporter ./base/ --values wakatime-exporter.yaml

update-prometheus: ## Update Prometheus
	helm uninstall prometheus; \
	  helm upgrade --install prometheus ./base/ --values prometheus.yaml

update-traefik: ## Update Traefik
	cd traefik; \
	  helm dependency update; \
	  helm upgrade --install traefik .
	cd traefik-sso; \
	  helm dependency update; \
	  helm upgrade --install traefik-sso .

update-all: ## Update all apps
	make update-base
	make update-pomerium
	make update-prometheus
	make update-traefik

.PHONY: help
