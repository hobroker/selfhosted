locals {
  name  = "code-server"
  alias = "vscode"
  port  = 8443
}

module "constants" {
  source = "../../../lib/constants"
}

module "traefik-labels" {
  source  = "../../../lib/traefik-labels"
  name    = local.alias
  port    = local.port
  network = var.network_name
}

module "image" {
  source = "../../../lib/image"
  name   = "linuxserver/code-server:latest"
}

resource "docker_volume" "config_volume" {
  count = var.config_path == "" ? 0 : 1

  name        = "${local.name}-config"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.config_path
  }
}

resource "docker_volume" "volumes" {
  for_each = var.mounts

  name        = "${local.name}-${replace(each.key, "/", "")}"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = each.key
  }
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
        for_each = docker_volume.config_volume

        content {
          source = var.config_path
          target = "/config"
          type   = "bind"
        }
      }

      dynamic "mounts" {
        for_each = {
        for source, target in var.mounts :
        target => docker_volume.volumes[source].name}

        content {
          target = mounts.key
          source = mounts.value
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
