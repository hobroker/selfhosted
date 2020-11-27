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
