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

.PHONY: help
