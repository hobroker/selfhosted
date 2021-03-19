locals {
  name = "qbittorrent"

  mounts = {
    (var.torrents_volume)              = "/blackhole",
    (var.downloads_volume)             = "/downloads",
    (docker_volume.config_volume.name) = "/config",
  }
  ports  = {
    (var.port) = var.port,
  }
}

data "docker_registry_image" "image" {
  name = "linuxserver/qbittorrent"
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

resource "docker_service" "app" {
  name = local.name

  task_spec {
    restart_policy = {
      condition    = "on-failure"
      delay        = "3s"
      window       = "10s"
      max_attempts = 3
    }

    networks = var.network_ids

    container_spec {
      image = docker_image.image.name
      env   = {
        WEBUI_PORT: var.port
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
