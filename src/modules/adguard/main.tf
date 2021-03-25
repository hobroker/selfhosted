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

    dynamic "ports" {
      for_each = local.udp_ports

      content {
        target_port    = ports.value
        published_port = ports.key
        protocol       = "udp"
      }
    }
  }
}
