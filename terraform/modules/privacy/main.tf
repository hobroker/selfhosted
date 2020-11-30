locals {
  name = "privacy"
}

module "adguard" {
  source = "../../services/adguard"

  port        = 3001
  config_path = "${var.appdata_root}/adguard/conf"
  data_path   = "${var.appdata_root}/adguard/work"
}
