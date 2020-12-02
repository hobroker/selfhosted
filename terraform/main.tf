module "proxy" {
  source = "./modules/proxy"

  hostname    = var.domain
  ssh_host    = var.ssh_host
  ssh_user    = var.ssh_user
  ssh_key     = var.ssh_key
  pilot_token = var.pilot_token
  network_ids = [
    module.debug.network_id
  ]
}

module "debug" {
  source = "./modules/debug"

  hostname     = var.domain
  appdata_root = var.appdata_root
}

module "torrent" {
  source = "./modules/torrent"

  appdata_root = var.appdata_root
  storage_root = var.storage_root
}

module "media" {
  source = "./modules/media"

  appdata_root = var.appdata_root
  storage_root = var.storage_root
}

module "privacy" {
  source = "./modules/privacy"

  appdata_root = var.appdata_root
}
