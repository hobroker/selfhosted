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
        source = var.config_path
        target = "/opt/adguardhome/conf"
        type   = "bind"
      }

      mounts {
        source = var.data_path
        target = "/opt/adguardhome/work"
        type   = "bind"
      }
    }

    placement {
      constraints = module.constants.manager_constraints

      platforms {
        architecture = "amd64"
        os           = "linux"
      }
    }

    log_driver {
      name = "json-file"
    }
  }

  endpoint_spec {
    ports {
      target_port    = 80
      published_port = var.port
      protocol       = "tcp"
      publish_mode   = "ingress"
    }

    dynamic "ports" {
      for_each = {
        53  = "tcp"
        853 = "tcp"
        53  = "udp"
        67  = "udp"
      }

      content {
        target_port    = ports.key
        published_port = ports.key
        protocol       = ports.value
        publish_mode   = "ingress"
      }
    }
  }
}
