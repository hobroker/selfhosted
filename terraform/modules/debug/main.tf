locals {
  name     = "debug"
  networks = [
    var.proxy_network_id,
    docker_network.network.id
  ]
}

resource "docker_network" "network" {
  name   = "${local.name}-network"
  driver = "overlay"
}

module "dozzle" {
  source = "./dozzle"

  port        = 8888
  network_ids = local.networks
  labels      = {
    "traefik.http.routers.debug.rule"                       = "host(`dozzle.${var.hostname}`)"
    "traefik.http.routers.debug.service"                    = "dozzle"
    "traefik.http.services.dozzle.loadbalancer.server.port" = "8080"
  }
}

module "code-server" {
  source = "./code-server"

  port        = 8084
  network_ids = local.networks
  config_path = "${var.appdata_root}/code-server"
  mounts      = {
    (var.appdata_root) = var.appdata_root
  }
}
