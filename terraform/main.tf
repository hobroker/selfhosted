module "dozzle" {
  source = "./services/dozzle"

  port = 8888
}

module "jackett" {
  source = "./services/jackett"

  port           = 9117
  config_path    = "/appdata/jackett"
  blackhole_path = "/storage/downloads/torrents"
}

module "qbittorrent" {
  source = "./services/qbittorrent"

  port           = 8112
  config_path    = "/appdata/qbittorrent"
  blackhole_path = "/storage/downloads/torrents"
}

module "sonarr" {
  source = "./services/sonarr"

  port           = 8989
  config_path    = "/appdata/sonarr"
  tv_path        = "/storage/tv-shows"
  downloads_path = "/storage/downloads"
}

module "radarr" {
  source = "./services/radarr"

  port           = 7878
  config_path    = "/appdata/radarr"
  movies_path    = "/storage/movies"
  downloads_path = "/storage/downloads"
}

module "code-server" {
  source = "./services/code-server"

  port        = 8084
  config_path = "/appdata/code-server"
  mounts      = {
    "/home/kira/compose" = "/compose"
    "/appdata"           = "/appdata"
  }
}

module "adguard" {
  source = "./services/adguard"

  port        = 3001
  config_path = "/appdata/adguard/conf"
  data_path   = "/appdata/adguard/work"
}

module "tautulli" {
  source = "./services/tautulli"

  port        = 8181
  config_path = "/appdata/tautulli"
}

module "xteve" {
  source = "./services/xteve"

  port        = 34400
  config_path = "/appdata/xteve"
}


module "plex" {
  source = "./services/plex"

  port        = 32400
  config_path = "/appdata/plex"
  mounts      = {
    "/storage" = "/storage"
  }
}
