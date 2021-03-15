locals {
  name = "prometheus"
  port = 9090

  published_ports = {
    (var.published_port) = local.port
  }
}

module "constants" {
  source = "../../../terraform/lib/constants"
}

module "image" {
  source = "../../../terraform/lib/image"
  name   = "prom/prometheus"
}

resource "docker_volume" "etc_volume" {
  name        = "${local.name}-etc"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.etc_path
  }
}

resource "docker_volume" "data_volume" {
  name        = "${local.name}-data"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.data_path
  }
}

resource "docker_service" "app" {
  name = local.name

  task_spec {
    restart_policy = module.constants.default_restart_policy
    networks = var.network_ids

    container_spec {
      image     = module.image.name

      mounts {
        source = docker_volume.etc_volume.name
        target = "/etc/prometheus"
        type   = "volume"
      }

      mounts {
        source = docker_volume.data_volume.name
        target = "/prometheus"
        type   = "volume"
      }
    }

    placement {
      constraints = module.constants.manager_constraints
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
