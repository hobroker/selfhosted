locals {
  name     = "media"
  networks = [docker_network.network.id]
}

resource "docker_network" "network" {
  name   = "${local.name}-network"
  driver = "overlay"
}

resource "docker_volume" "storage_volume" {
  name        = "${local.name}-storage"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.storage_root
  }
}

resource "docker_volume" "downloads_volume" {
  name        = "${local.name}-downloads"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = "${var.storage_root}/downloads"
  }
}

module "xteve" {
  source = "./xteve"

  port        = 34400
  network_ids = local.networks
  config_path = "${var.appdata_root}/xteve"
}

module "plex" {
  source = "./plex"

  port        = 32400
  network_ids = local.networks
  config_path = "${var.appdata_root}/plex"
  volumes     = {
    (docker_volume.storage_volume.name) = docker_volume.storage_volume.driver_opts.mountpoint
  }
}

//module "ombi" {
//  source = "./ombi"
//
//  port        = 3579
//  network_ids = local.networks
//  config_path = "${var.appdata_root}/ombi"
//}
