module "dozzle" {
  source = "./services/dozzle"

  port = 8888
}

module "torrent" {
  source = "./modules/torrent"

  appdata_root = var.appdata_root
}

module "sonarr" {
  source = "./services/sonarr"

  tag            = "preview"
  port           = 8989
  config_path    = "${var.appdata_root}/sonarr"
  tv_path        = "/storage/tv-shows"
  downloads_path = "/storage/downloads"
}

module "radarr" {
  source = "./services/radarr"

  port           = 7878
  config_path    = "${var.appdata_root}/radarr"
  movies_path    = "/storage/movies"
  downloads_path = "/storage/downloads"
}

module "code-server" {
  source = "./services/code-server"

  port        = 8084
  config_path = "${var.appdata_root}/code-server"
  mounts      = {
    (var.appdata_root)   = var.appdata_root
    "/home/kira/compose" = "/compose"
  }
}

module "adguard" {
  source = "./services/adguard"

  port        = 3001
  config_path = "${var.appdata_root}/adguard/conf"
  data_path   = "${var.appdata_root}/adguard/work"
}

module "tautulli" {
  source = "./services/tautulli"

  port        = 8181
  config_path = "${var.appdata_root}/tautulli"
}

module "xteve" {
  source = "./services/xteve"

  port        = 34400
  config_path = "${var.appdata_root}/xteve"
}

module "plex" {
  source = "./services/plex"

  port        = 32400
  config_path = "${var.appdata_root}/plex"
  mounts      = {
    "/storage" = "/storage"
  }
}

module "ombi" {
  source = "./services/ombi"

  port        = 3579
  config_path = "${var.appdata_root}/ombi"
}
