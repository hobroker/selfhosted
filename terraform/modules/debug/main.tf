locals {
  name     = "debug"
  networks = [docker_network.network.id]
}

resource "docker_network" "network" {
  name   = "${local.name}-network"
  driver = "overlay"
}

module "dozzle" {
  source = "./dozzle"

  network_ids  = local.networks
  network_name = docker_network.network.name
}

module "code-server" {
  source = "./code-server"

  network_ids  = local.networks
  network_name = docker_network.network.name
  config_path  = "${var.appdata_root}/code-server"
  mounts       = {
    (var.appdata_root) = var.appdata_root
  }
}
