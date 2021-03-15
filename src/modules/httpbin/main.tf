locals {
  name = "httpbin"
  port = 80

  published_ports = {
    (var.published_port) = local.port
  }
}

data "docker_registry_image" "image" {
  name = "kennethreitz/httpbin"
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
