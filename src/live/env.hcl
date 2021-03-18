locals {
  storage = {
    downloads_path = "/storage/downloads"
    torrents_path  = "/storage/downloads/torrents"
  }

  httpbin = {
    port = 9009
  }

  dozzle = {
    port = 9010
  }

  grafana = {
    port     = 5000
    lib_path = "/appdata/grafana/lib"
    etc_path = "/appdata/grafana/etc"
  }

  prometheus = {
    port      = 9090
    etc_path  = "/appdata/prometheus/etc"
    data_path = "/appdata/prometheus/data"
  }

  jackett = {
    port        = 9117
    config_path = "/appdata/jackett"
  }

  qbittorrent = {
    port        = 8112
    config_path = "/appdata/qbittorrent"
  }
}
