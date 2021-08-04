locals {
  port = 80

  ports     = {
    (var.port) = local.port
    53         = 53,
    853        = 853,
  }
  udp_ports = {
    53 = 53,
    67 = 67,
  }
  mounts    = {
    (docker_volume.config_volume.name) = "/opt/adguardhome/conf",
    (docker_volume.data_volume.name)   = "/opt/adguardhome/work",
  }
}

data "docker_registry_image" "image" {
  name = "adguard/adguardhome:v0.105.2"
}

resource "docker_image" "image" {
  name          = data.docker_registry_image.image.name
  pull_triggers = [data.docker_registry_image.image.sha256_digest]
}

resource "docker_volume" "config_volume" {
  name        = "${var.name}-etc"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.config_path
  }
}

resource "docker_volume" "data_volume" {
  name        = "${var.name}-lib"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.data_path
  }
}

resource "docker_container" "app" {
  name         = var.name
  image        = docker_image.image.name
  restart      = "unless-stopped"

  dynamic "mounts" {
    for_each = local.mounts

    content {
      source = mounts.key
      target = mounts.value
      type   = "volume"
    }
  }

  dynamic "ports" {
    for_each = local.ports

    content {
      internal = ports.value
      external = ports.key
      protocol = "tcp"
    }
  }

  dynamic "ports" {
    for_each = local.udp_ports

    content {
      internal = ports.value
      external = ports.key
      protocol = "udp"
    }
  }
}
