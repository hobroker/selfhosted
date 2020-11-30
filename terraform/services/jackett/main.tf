locals {
  name = "jackett"
}

module "constants" {
  source = "../../constants"
}

resource "docker_image" "image" {
  name         = "linuxserver/jackett:latest"
  keep_locally = true
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
      image = docker_image.image.name
      env   = module.constants.default_container_env

      mounts {
        source = docker_volume.config_volume.name
        target = "/config"
        type   = "volume"
      }

      dynamic "mounts" {
        for_each = var.blackhole_volume == "" ? [] : [1]

        content {
          source = var.blackhole_volume
          target = "/downloads"
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
      target_port    = 9117
      published_port = var.port
      protocol       = "tcp"
      publish_mode   = "ingress"
    }
  }
}
