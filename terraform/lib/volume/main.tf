resource "docker_volume" "volume" {
  name   = var.name
  driver = "local-persist"

  driver_opts = {
    mountpoint = var.path
  }
}
