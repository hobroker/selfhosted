locals {
  port = 9117

  ports  = {
    (var.port) = local.port
  }
  mounts = {
    (var.torrents_volume)              = "/blackhole",
    (docker_volume.config_volume.name) = "/config",
  }
}

data "docker_registry_image" "image" {
  name = "linuxserver/jackett"
}

resource "docker_image" "image" {
  name          = data.docker_registry_image.image.name
  pull_triggers = [data.docker_registry_image.image.sha256_digest]
}

resource "docker_volume" "config_volume" {
  name        = "${var.name}-config"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.config_path
  }
}

resource "docker_service" "app" {
  name = var.name

  task_spec {
    restart_policy = var.restart_policy

    networks = var.network_ids

    container_spec {
      image = docker_image.image.name
      env   = var.env

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
      platforms {
        architecture = "amd64"
        os           = "linux"
      }

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
