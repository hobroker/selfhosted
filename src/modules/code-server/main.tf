locals {
  alias = "vscode"
  port  = 8443

  ports = {
    (var.port) = local.port
  }

  traefik_labels = {
    "subdomain"                                                     = local.alias
    "traefik.http.routers.${local.alias}.service"                   = local.alias
    "traefik.http.services.${local.alias}.loadbalancer.server.port" = local.port
    "traefik.docker.network"                                        = var.network_name
  }
  labels         = var.network_name == null ? {} : local.traefik_labels
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

  dynamic "labels" {
    for_each = local.labels

    content {
      label = labels.key
      value = labels.value
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
