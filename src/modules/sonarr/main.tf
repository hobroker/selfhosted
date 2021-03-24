locals {
  name = "sonarr"
  port = 8989

  mounts = {
    (docker_volume.config_volume.name) = "/config",
    (docker_volume.tv_volume.name)     = "/tv",
    (var.downloads_volume)             = "/downloads",
  }
  ports  = {
    (var.port) = local.port
  }
}

data "docker_registry_image" "image" {
  name = "linuxserver/sonarr:${var.tag}"
}

resource "docker_image" "image" {
  name          = data.docker_registry_image.image.name
  pull_triggers = [data.docker_registry_image.image.sha256_digest]
}

resource "docker_volume" "config_volume" {
  name        = "${local.name}-config"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.config_path
  }
}

resource "docker_volume" "tv_volume" {
  name        = "${local.name}-tv"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.tv_path
  }
}

resource "docker_service" "app" {
  name = local.name

  task_spec {
    restart_policy = var.restart_policy

    networks = var.network_ids

    container_spec {
      image = docker_image.image.name
      env   = {
        PGID = "1000"
        PUID = "1000"
        TZ   = "Europe/Chisinau"
      }

      dynamic "mounts" {
        for_each = local.mounts

        content {
          source = mounts.key
          target = mounts.value
          type   = "volume"
        }
      }
    }

    placement {
      constraints = [
        "node.role==manager"
      ]
    }

    log_driver {
      name = "json-file"
    }
  }

  endpoint_spec {
    dynamic "ports" {
      for_each = local.ports

      content {
        target_port    = ports.value
        published_port = ports.key
        protocol       = "tcp"
      }
    }
  }
}
