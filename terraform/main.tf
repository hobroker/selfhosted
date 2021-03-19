module "proxy" {
  source = "./modules/proxy"

  hostname    = var.domain
  pilot_token = var.pilot_token
  network_ids = [
//    module.debug.network_id
  ]
}

module "media" {
  source = "./modules/media"

  appdata_root = var.appdata_root
  storage_root = var.storage_root
}
