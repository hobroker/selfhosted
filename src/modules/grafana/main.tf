locals {
  name = "grafana"
  port = 3000

  ports  = {
    (var.port) = local.port
  }
  mounts = {
    (docker_volume.lib_volume.name) = "/var/lib/grafana",
    (docker_volume.etc_volume.name) = "/etc/grafana",
  }
}

data "docker_registry_image" "image" {
  name = "grafana/grafana:7.4.5"
}

resource "docker_image" "image" {
  name          = data.docker_registry_image.image.name
  pull_triggers = [data.docker_registry_image.image.sha256_digest]
}

resource "docker_volume" "etc_volume" {
  name        = "${local.name}-etc"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.etc_path
  }
}

resource "docker_volume" "lib_volume" {
  name        = "${local.name}-lib"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.lib_path
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
    networks       = var.network_ids

    container_spec {
      image = docker_image.image.name

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
