module "dozzle" {
  source = "./services/dozzle"

  port = 8888
}

module "jackett" {
  source = "./services/jackett"

  port    = 9117
  volumes = {
    config    = "/appdata/jackett"
    downloads = "/storage/downloads/torrents"
  }
}

module "qbittorrent" {
  source = "./services/qbittorrent"

  port    = 8112
  volumes = {
    config    = "/appdata/qbittorrent"
    downloads = "/storage/downloads/torrents"
  }
}

module "sonarr" {
  source = "./services/sonarr"

  port    = 8989
  volumes = {
    config    = "/appdata/sonarr"
    tv        = "/storage/tv-shows"
    downloads = "/storage/downloads"
  }
}

module "radarr" {
  source = "./services/radarr"

  port    = 7878
  volumes = {
    config    = "/appdata/radarr"
    movies    = "/storage/movies"
    downloads = "/storage/downloads"
  }
}

module "code-server" {
  source = "./services/code-server"

  port          = 8084
  config_volume = "/appdata/code-server"
  mounts        = {
    "/home/kira/compose" = "/compose"
    "/appdata"           = "/appdata"
  }
}

module "adguard" {
  source = "./services/adguard"

  port          = 3001
  config_volume = "/appdata/adguard/conf"
  data_volume   = "/appdata/adguard/work"
}
