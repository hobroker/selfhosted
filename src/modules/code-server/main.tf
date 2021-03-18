locals {
  name  = "code-server"
  alias = "vscode"
  port  = 8443

  published_ports = {
    (var.port) = local.port
  }
}

data "docker_registry_image" "image" {
  name = "linuxserver/code-server"
}

resource "docker_image" "image" {
  name          = data.docker_registry_image.image.name
  pull_triggers = [data.docker_registry_image.image.sha256_digest]
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
      env   = {
        PASSWORD      = var.password
        SUDO_PASSWORD = var.sudo_password
        PGID          = "1000"
        PUID          = "1000"
        TZ            = "Europe/Chisinau"
      }

      dynamic "mounts" {
        for_each = var.mounts

        content {
          target = mounts.value
          source = mounts.key
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

  dynamic "endpoint_spec" {
    for_each = local.published_ports

    content {
      ports {
        target_port    = endpoint_spec.value
        published_port = endpoint_spec.key
        protocol       = "tcp"
      }
    }
  }
}
