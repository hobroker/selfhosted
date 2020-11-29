locals {
  name = "adguard"
}

module "constants" {
  source = "../../constants"
}

resource "docker_image" "image" {
  name         = "adguard/adguardhome:latest"
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

      mounts {
        source = var.config_volume
        target = "/opt/adguardhome/conf"
        type   = "bind"
      }

      mounts {
        source = var.data_volume
        target = "/opt/adguardhome/work"
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
      target_port    = 53
      published_port = 53
      protocol       = "tcp"
      publish_mode   = "ingress"
    }

    ports {
      target_port    = 53
      published_port = 53
      protocol       = "udp"
      publish_mode   = "ingress"
    }

    ports {
      target_port    = 67
      published_port = 67
      protocol       = "udp"
      publish_mode   = "ingress"
    }

    ports {
      target_port    = 853
      published_port = 853
      protocol       = "tcp"
      publish_mode   = "ingress"
    }

    ports {
      target_port    = 80
      published_port = var.port
      protocol       = "tcp"
      publish_mode   = "ingress"
    }
  }
}
