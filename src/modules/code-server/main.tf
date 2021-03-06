locals {
  alias = "vscode"
  port  = 8443

  ports = {
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
  name = var.name

  task_spec {
    restart_policy = var.restart_policy

    networks = var.network_ids

    container_spec {
      image = docker_image.image.name
      env   = merge({
        PASSWORD      = var.password
        SUDO_PASSWORD = var.sudo_password
      }, var.env)

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

      platforms {
        architecture = "amd64"
        os           = "linux"
      }
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
