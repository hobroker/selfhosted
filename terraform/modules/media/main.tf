locals {
  name = "media"
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

module "sonarr" {
  source = "../../services/sonarr"

  tag              = "preview"
  port             = 8989
  config_path      = "${var.appdata_root}/sonarr"
  tv_path          = "${var.storage_root}/tv-shows"
  downloads_volume = docker_volume.downloads_volume.name
}

module "radarr" {
  source = "../../services/radarr"

  port             = 7878
  config_path      = "${var.appdata_root}/radarr"
  movies_path      = "${var.storage_root}/movies"
  downloads_volume = docker_volume.downloads_volume.name
}

module "tautulli" {
  source = "../../services/tautulli"

  port        = 8181
  config_path = "${var.appdata_root}/tautulli"
}

module "xteve" {
  source = "../../services/xteve"

  port        = 34400
  config_path = "${var.appdata_root}/xteve"
}

module "plex" {
  source = "../../services/plex"

  port        = 32400
  config_path = "${var.appdata_root}/plex"
  volumes     = {
    (docker_volume.storage_volume.name) = docker_volume.storage_volume.driver_opts.mountpoint
  }
}

module "ombi" {
  source = "../../services/ombi"

  port        = 3579
  config_path = "${var.appdata_root}/ombi"
}
