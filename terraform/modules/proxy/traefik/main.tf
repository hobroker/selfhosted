locals {
  name = "traefik"
}

module "constants" {
  source = "../../../lib/constants"
}

resource "docker_image" "image" {
  name         = "traefik:${var.tag}"
  keep_locally = true
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
        target    = "/var/run/docker.sock"
        source    = "/var/run/docker.sock"
        type      = "bind"
        read_only = true
      }

      mounts {
        source = var.config_yaml_path
        target = "/traefik.yaml"
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
      published_port = 80
      protocol       = "tcp"
      publish_mode   = "ingress"
    }

    ports {
      target_port    = 8080
      published_port = var.api_port
      protocol       = "tcp"
      publish_mode   = "ingress"
    }
  }
}
