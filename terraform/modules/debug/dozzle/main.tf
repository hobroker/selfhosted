locals {
  name = "dozzle"
  port = 8080
}

module "constants" {
  source = "../../../lib/constants"
}

module "traefik-labels" {
  source  = "../../../lib/traefik-labels"
  name    = local.name
  port    = local.port
  network = var.network_name
}

module "image" {
  source = "../../../lib/image"
  name   = "amir20/dozzle:latest"
}

resource "docker_service" "app" {
  name = local.name

  task_spec {
    restart_policy = module.constants.default_restart_policy

    networks = var.network_ids

    container_spec {
      image     = module.image.name
      read_only = true

      mounts {
        target    = "/var/run/docker.sock"
        source    = "/var/run/docker.sock"
        type      = "bind"
        read_only = true
      }
    }

    placement {
      constraints = module.constants.manager_constraints
    }

    log_driver {
      name = "json-file"
    }
  }

  dynamic "labels" {
    for_each = merge(module.traefik-labels.labels, var.labels)

    content {
      label = labels.key
      value = labels.value
    }
  }

  dynamic "endpoint_spec" {
    for_each = var.published_port == null ? {} : {
      (var.published_port) = local.port
    }

    content {
      ports {
        target_port    = endpoint_spec.value
        published_port = endpoint_spec.key
        protocol       = "tcp"
      }
    }
  }
}
