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

resource "docker_volume" "config_volume" {
  name        = "${local.name}-config"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.config_path
  }
}

resource "docker_volume" "volumes" {
  for_each = var.mounts

  name        = "${local.name}-${replace(each.key, "/", "")}"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = each.key
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
        source = docker_volume.config_volume.name
        target = "/config"
        type   = "volume"
      }

      dynamic "mounts" {
        for_each = {
        for source, target in var.mounts :
        target => docker_volume.volumes[source].name}

        content {
          target = mounts.key
          source = mounts.value
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
