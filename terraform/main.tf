module "debug" {
  source = "./modules/debug"

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
