locals {
  domain = "hobroker.me"

  node-exporter = {
    port = 9100
  }

  adguard = {
    port        = 3001
    config_path = "/appdata/adguard/conf"
    data_path   = "/appdata/adguard/work"
  }

  adguard-exporter = {
    port = 9617
  }

  nextcloud = {
    port        = 8004
    config_path = "/appdata/nextcloud"
  }
}
