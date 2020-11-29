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

resource "docker_network" "network" {
  name   = "${local.name}-network"
  driver = "overlay"
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
        for_each = var.config_path == "" ? [] : [1]

        content {
          source = var.config_path
          target = "/config"
          type   = "bind"
        }
      }

      dynamic "mounts" {
        for_each = var.config_path == "" ? [] : [1]

        content {
          source = var.blackhole_path
          target = "/downloads"
          type   = "bind"
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
