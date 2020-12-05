locals {
  name = "ombi"
}

module "constants" {
  source = "../../../lib/constants"
}

module "image" {
  source = "../../../lib/image"
  name   = "linuxserver/ombi"
  tag    = var.tag
}

resource "docker_volume" "config_volume" {
  name        = "${local.name}-config"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.config_path
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
        WEBUI_PORT: var.port
      })

      mounts {
        source = docker_volume.config_volume.name
        target = "/config"
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

  endpoint_spec {
    ports {
      target_port    = 3579
      published_port = var.port
      protocol       = "tcp"
      publish_mode   = "ingress"
    }
  }
}
