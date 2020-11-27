locals {
  name = "radarr"
}

module "constants" {
  source = "../../constants"
}

resource "docker_image" "image" {
  name         = "linuxserver/radarr:latest"
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
        source = var.volumes.config
        target = "/config"
        type   = "bind"
      }

      mounts {
        source = var.volumes.downloads
        target = "/downloads"
        type   = "bind"
      }

      mounts {
        source = var.volumes.movies
        target = "/movies"
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
      target_port    = 7878
      published_port = var.port
      protocol       = "tcp"
      publish_mode   = "ingress"
    }
  }
}
