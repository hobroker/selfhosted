locals {
  name = "xteve"
}

module "constants" {
  source = "../../constants"
}

resource "docker_image" "image" {
  name         = "tnwhitwell/xteve:latest"
  keep_locally = true
}

resource "docker_network" "network" {
  name   = "${local.name}-network"
  driver = "overlay"
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

    networks = [
      docker_network.network.id
    ]

    container_spec {
      image = docker_image.image.name
      env   = module.constants.default_container_env
      user  = "1000:1000"

      mounts {
        source = docker_volume.config_volume.name
        target = "/config"
        type   = "volume"
      }

      mounts {
        source = var.tmp_path
        target = "/tmp/xteve"
        type   = "bind"
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
      target_port    = 34400
      published_port = var.port
      protocol       = "tcp"
      publish_mode   = "ingress"
    }
  }
}
