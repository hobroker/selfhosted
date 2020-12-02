locals {
  name     = "privacy"
  networks = [docker_network.network.id]
}

resource "docker_network" "network" {
  name   = "${local.name}-network"
  driver = "overlay"
}

module "adguard" {
  source = "./adguard"

  port        = 3001
  network_ids = local.networks
  config_path = "${var.appdata_root}/adguard/conf"
  data_path   = "${var.appdata_root}/adguard/work"
}
