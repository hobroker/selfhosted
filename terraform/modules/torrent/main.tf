locals {
  name     = "torrents"
  networks = [docker_network.network.id]
}

resource "docker_network" "network" {
  name   = "${local.name}-network"
  driver = "overlay"
}

resource "docker_volume" "blackhole_volume" {
  name        = "${local.name}-blackhole"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = "${var.storage_root}/downloads/torrents"
  }
}

module "jackett" {
  source = "../../services/jackett"

  port             = 9117
  network_ids      = local.networks
  config_path      = "${var.appdata_root}/jackett"
  blackhole_volume = docker_volume.blackhole_volume.name
}

module "qbittorrent" {
  source = "../../services/qbittorrent"

  port             = 8112
  network_ids      = local.networks
  config_path      = "${var.appdata_root}/qbittorrent"
  blackhole_volume = docker_volume.blackhole_volume.name
}
