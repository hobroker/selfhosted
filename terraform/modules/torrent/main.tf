locals {
  name = "torrents"
}

resource "docker_volume" "blackhole_volume" {
  name        = "${local.name}-blackhole"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = "/storage/downloads/torrents"
  }
}

module "jackett" {
  source = "../../services/jackett"

  port             = 9117
  config_path      = "${var.appdata_root}/jackett"
  blackhole_volume = docker_volume.blackhole_volume.name
}

module "qbittorrent" {
  source = "../../services/qbittorrent"

  port             = 8112
  config_path      = "${var.appdata_root}/qbittorrent"
  blackhole_volume = docker_volume.blackhole_volume.name
}
