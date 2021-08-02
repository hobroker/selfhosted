locals {
  port = 9090

  ports  = {
    (var.port) = local.port
  }
  mounts = {
    (docker_volume.data_volume.name) = "/prometheus",
    (docker_volume.etc_volume.name)  = "/etc/prometheus",
  }
}

data "docker_registry_image" "image" {
  name = "prom/prometheus:${var.tag}"
}

resource "docker_image" "image" {
  name          = data.docker_registry_image.image.name
  pull_triggers = [data.docker_registry_image.image.sha256_digest]
}

resource "docker_volume" "etc_volume" {
  name        = "${var.name}-etc"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.etc_path
  }
}

resource "docker_volume" "data_volume" {
  name        = "${var.name}-data"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.data_path
  }
}

resource "docker_service" "app" {
  name = var.name

  task_spec {
    restart_policy = var.restart_policy

    networks = var.network_ids

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
