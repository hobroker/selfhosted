locals {
  name = "plex"
}

module "constants" {
  source = "../../../lib/constants"
}

module "image" {
  source = "../../../lib/image"
  name   = "linuxserver/plex"
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
    restart_policy = merge(module.constants.default_restart_policy, {
      delay  = "15s"
      window = "1m"
    })


    resources {
      reservation {
        memory_bytes = 200 * 1024e+3
        nano_cpus    = 1e+6
      }

      limits {
        memory_bytes = 3000 * 1024e+3
      }
    }

    networks = var.network_ids

    container_spec {
      image = module.image.name
      env   = merge(module.constants.default_container_env, {
        UMASK_SET  = 022
        PLEX_CLAIM = var.plex_claim
        VERSION    = var.plex_version
      })

      mounts {
        source = docker_volume.config_volume.name
        target = "/config"
        type   = "volume"
      }

      dynamic "mounts" {
        for_each = var.volumes

        content {
          source = mounts.key
          target = mounts.value
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
