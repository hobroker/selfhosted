locals {
  name = "dozzle"
  port = 8080

  ports = {
    (var.port) = local.port
  }
}

data "docker_registry_image" "image" {
  name = "amir20/dozzle:v3.2.3"
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

    networks = var.network_ids

    container_spec {
      image     = docker_image.image.name
      read_only = true

      mounts {
        target    = "/var/run/docker.sock"
        source    = "/var/run/docker.sock"
        type      = "bind"
        read_only = true
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
