locals {
  name            = "ombi"
  port            = 3579
  mounts          = {for mount in module.mounts: mount.name => mount.target}
  env             = merge(module.constants.default_container_env, {
    WEBUI_PORT: var.port
  })
  published_ports = var.port == null ? {} : {
    (var.port) = local.port
  }
}

module "constants" {
  source = "../../../lib/constants"
}

module "image" {
  source = "../../../lib/image"
  name   = "linuxserver/ombi"
  tag    = var.tag
}

module "mounts" {
  source   = "../../../lib/volume"
  for_each = {
    (var.config_path) = "/config"
  }

  name        = local.name
  path        = each.key
  target_path = each.value
}

resource "docker_service" "app" {
  name = local.name

  task_spec {
    restart_policy = module.constants.default_restart_policy

    networks = var.network_ids

    container_spec {
      image = module.image.name
      env   = local.env

      dynamic "mounts" {
        for_each = local.mounts

        content {
          target = mounts.value
          source = mounts.key
          type   = "volume"
        }
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
