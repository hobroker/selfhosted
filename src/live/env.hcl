locals {
  storage = {
    appdata_path   = "/appdata"
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

  adguard = {
    port        = 3001
    config_path = "/appdata/adguard/conf"
    data_path   = "/appdata/adguard/work"
  }

  sonarr = {
    port        = 8989
    config_path = "/appdata/sonarr"
    tv_path     = "/storage/tv-shows"
  }

  radarr = {
    port        = 7878
    config_path = "/appdata/radarr"
    movies_path = "/storage/movies"
  }

  code-server = {
    port = 8001
  }
}
