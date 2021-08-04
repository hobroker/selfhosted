locals {
  port = 9100
}

data "docker_registry_image" "image" {
  name = "quay.io/prometheus/node-exporter:latest"
}

resource "docker_image" "image" {
  name          = data.docker_registry_image.image.name
  pull_triggers = [data.docker_registry_image.image.sha256_digest]
}

resource "docker_container" "app" {
  name         = var.name
  image        = docker_image.image.name
  command      = [
    "--path.rootfs=/host"
  ]
  pid_mode     = "host"
  restart      = "unless-stopped"
  network_mode = "host"

  mounts {
    source    = "/"
    read_only = true
    target    = "/host"
    type      = "bind"

    bind_options {
      propagation = "rslave"
    }
  }

  ports {
    internal = local.port
    external = var.port
  }
}
