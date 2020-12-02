locals {
  name = "traefik"
  port = 8080
}

module "constants" {
  source = "../../../lib/constants"
}

module "image" {
  source = "../../../lib/image"
  name   = "traefik:${var.tag}"
}

resource "docker_service" "app" {
  name = local.name

  task_spec {
    restart_policy = module.constants.default_restart_policy

    networks = var.network_ids

    container_spec {
      image = module.image.name
      env   = module.constants.default_container_env

      configs {
        config_id   = docker_config.traefik_yaml.id
        config_name = docker_config.traefik_yaml.name
        file_name   = "/traefik.yaml"
      }

      mounts {
        target    = "/var/run/docker.sock"
        source    = "/var/run/docker.sock"
        type      = "bind"
        read_only = true
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
    dynamic "ports" {
      for_each = var.api_port == null ? {
        80 = 80
      } : {
        80             = 80,
        (var.api_port) = local.port
      }

      content {
        target_port    = ports.value
        published_port = ports.key
        protocol       = "tcp"
        publish_mode   = "ingress"
      }
    }
  }
}
