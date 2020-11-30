locals {
  name = "sonarr"

  volumes = {
    "/config"    = var.config_path
    "/downloads" = var.downloads_path
    "/tv"        = var.tv_path
  }
}

module "constants" {
  source = "../../constants"
}

resource "docker_image" "image" {
  name         = "linuxserver/sonarr:${var.tag}"
  keep_locally = true
}

resource "docker_network" "network" {
  name   = "${local.name}-network"
  driver = "overlay"
}

resource "docker_volume" "volumes" {
  for_each = local.volumes

  name        = "${local.name}-${replace(each.key, "/", "")}"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = each.value
  }
}

resource "docker_service" "app" {
  name = local.name

  task_spec {
    restart_policy = module.constants.default_restart_policy

    networks = [
      docker_network.network.id
    ]

    container_spec {
      image = docker_image.image.name
      env   = module.constants.default_container_env

      dynamic "mounts" {
        for_each = {
        for target, source in local.volumes :
        target => docker_volume.volumes[target].name}

        content {
          source = mounts.value
          target = mounts.key
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

  endpoint_spec {
    ports {
      target_port    = 8989
      published_port = var.port
      protocol       = "tcp"
      publish_mode   = "ingress"
    }
  }
}
