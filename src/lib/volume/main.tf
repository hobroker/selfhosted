locals {
  suffix = var.target_path == null ? "" : "-${replace(var.target_path, "/", "")}"
}

resource "docker_volume" "volume" {
  name = "${var.name}${local.suffix}"

  driver = "local-persist"
  driver_opts = {
    mountpoint = var.path
  }
}
