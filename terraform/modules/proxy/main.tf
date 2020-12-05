locals {
  name     = "proxy"
  networks = concat(var.network_ids, [docker_network.network.id])
}

resource "docker_network" "network" {
  name   = "${local.name}-network"
  driver = "overlay"
}

module "traefik" {
  source = "./traefik"

  api_port    = 8080
  network_ids = local.networks
  hostname    = var.hostname
  pilot_token = var.pilot_token
}
