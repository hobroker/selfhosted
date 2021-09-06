help: ## Show this help message
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

lint: ## Run linter
	helm lint ./prometheus/
	helm lint ./plex/
	helm lint ./pomerium/
	helm lint ./base/ --values code-server.yaml
	helm lint ./base/ --values grafana.yaml
	helm lint ./base/ --values httpbin.yaml
	helm lint ./base/ --values jackett.yaml
	helm lint ./base/ --values qbittorrent.yaml
	helm lint ./base/ --values radarr.yaml
	helm lint ./base/ --values sonarr.yaml
	helm lint ./base/ --values tautulli.yaml

update-base: ## Update apps that use base chart
	helm upgrade --install code-server ./base/ --values code-server.yaml
	helm upgrade --install grafana ./base/ --values grafana.yaml
	helm upgrade --install httpbin ./base/ --values httpbin.yaml
	helm upgrade --install jackett ./base/ --values jackett.yaml
	helm upgrade --install qbittorrent ./base/ --values qbittorrent.yaml
	helm upgrade --install radarr ./base/ --values radarr.yaml
	helm upgrade --install sonarr ./base/ --values sonarr.yaml
	helm upgrade --install tautulli ./base/ --values tautulli.yaml

.PHONY: help
