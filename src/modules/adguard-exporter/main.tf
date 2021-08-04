locals {
  port = 9617

  ports = {
    (var.port) = local.port
  }
}

data "docker_registry_image" "image" {
  name = "ebrianne/adguard-exporter:latest"
}

resource "docker_image" "image" {
  name          = data.docker_registry_image.image.name
  pull_triggers = [data.docker_registry_image.image.sha256_digest]
}

resource "docker_service" "app" {
  name = var.name

  task_spec {
    restart_policy = var.restart_policy

    networks = var.network_ids

    container_spec {
      image = docker_image.image.name
      env   = {
        adguard_protocol = "http"
        adguard_hostname = var.adguard_hostname
        adguard_username = var.adguard_username
        adguard_password = var.adguard_password
        adguard_port     = var.adguard_port
        interval         = "10s"
        log_limit        = 10000
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
