module "proxy" {
  source = "./modules/proxy"

  hostname     = "hobroker.me"
  appdata_root = var.appdata_root
  ssh_host     = var.ssh_host
  ssh_user     = var.ssh_user
  ssh_key      = var.ssh_key
}

module "debug" {
  source = "./modules/debug"

  hostname         = "hobroker.me"
  proxy_network_id = module.proxy.network_id
  appdata_root     = var.appdata_root
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
