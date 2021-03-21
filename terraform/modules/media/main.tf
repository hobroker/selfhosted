locals {
  name     = "media"
  networks = [docker_network.network.id]
}

resource "docker_network" "network" {
  name   = "${local.name}-network"
  driver = "overlay"
}

module "xteve" {
  source = "./xteve"

  port        = 34400
  network_ids = local.networks
  config_path = "${var.appdata_root}/xteve"
}

//module "ombi" {
//  source = "./ombi"
//
//  port        = 3579
//  network_ids = local.networks
//  config_path = "${var.appdata_root}/ombi"
//}
