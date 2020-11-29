locals {
  name = "plex"
}

module "constants" {
  source = "../../constants"
}

resource "docker_image" "image" {
  name         = "ghcr.io/linuxserver/plex:latest"
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
      env   = merge(module.constants.default_container_env, {
        UMASK_SET  = 022
        PLEX_CLAIM = var.plex_claim
        VERSION    = var.plex_version
      })

      mounts {
        source = var.config_path
        target = "/config"
        type   = "bind"
      }

      dynamic "mounts" {
        for_each = var.mounts

        content {
          target = mounts.value
          source = mounts.key
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
      target_port    = 32400
      published_port = var.port
      protocol       = "tcp"
      publish_mode   = "ingress"
    }

    // GDM network discovery
    dynamic "ports" {
      for_each = [32410, 32412, 32413, 32414]

      content {
        target_port    = ports.value
        published_port = ports.value
        protocol       = "udp"
        publish_mode   = "ingress"
      }
    }
  }
}
