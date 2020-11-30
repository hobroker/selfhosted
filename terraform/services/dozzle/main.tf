locals {
  name = "dozzle"
}

module "constants" {
  source = "../../constants"
}

resource "docker_image" "image" {
  name         = "amir20/dozzle:latest"
  keep_locally = true
}

resource "docker_service" "app" {
  name = local.name

  task_spec {
    restart_policy = module.constants.default_restart_policy

    networks = var.network_ids

    container_spec {
      image     = docker_image.image.name
      read_only = true

      mounts {
        target    = "/var/run/docker.sock"
        source    = "/var/run/docker.sock"
        type      = "bind"
        read_only = true
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
      target_port    = 8080
      published_port = var.port
      protocol       = "tcp"
    }
  }
}
