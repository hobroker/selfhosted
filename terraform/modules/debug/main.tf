locals {
  name = "debug"
}

module "dozzle" {
  source = "../../services/dozzle"

  port = 8888
}

module "code-server" {
  source = "../../services/code-server"

  port        = 8084
  config_path = "${var.appdata_root}/code-server"
  mounts      = {
    (var.appdata_root) = var.appdata_root
  }
}
