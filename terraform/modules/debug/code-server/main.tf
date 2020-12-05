locals {
  name  = "code-server"
  alias = "vscode"
  port  = 8443

  labels          = merge(module.traefik-labels.labels, var.labels)
  mounts          = {for mount in module.mounts: mount.name => mount.target}
  published_ports = var.published_port == null ? {} : {
    (var.published_port) = local.port
  }
}

module "constants" {
  source = "../../../lib/constants"
}

module "traefik-labels" {
  source = "../../../lib/traefik-labels"

  name    = local.alias
  port    = local.port
  network = var.network_name
  enabled = var.enable_proxy
}

module "image" {
  source = "../../../lib/image"
  name   = "linuxserver/code-server"
}

module "mounts" {
  source   = "../../../lib/volume"
  for_each = merge(var.mounts, {
    (var.config_path) = "/config"
  })

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
      env   = merge(module.constants.default_container_env, {
        PASSWORD      = var.password
        SUDO_PASSWORD = var.sudo_password
      })

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

  dynamic "labels" {
    for_each = local.labels

    content {
      label = labels.key
      value = labels.value
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
