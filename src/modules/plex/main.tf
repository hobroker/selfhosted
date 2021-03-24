locals {
  port = 32400

  ports = {
    (var.port) = local.port
  }

  // GDM network discovery
  udp_ports = {
    32410 = 32410,
    32412 = 32412,
    32413 = 32413,
    32414 = 32414,
  }
  mounts    = merge(var.mounts, {
    (docker_volume.config_volume.name) = "/config",
  })
}

data "docker_registry_image" "image" {
  name = "linuxserver/plex"
}

resource "docker_image" "image" {
  name          = data.docker_registry_image.image.name
  pull_triggers = [data.docker_registry_image.image.sha256_digest]
}

resource "docker_volume" "config_volume" {
  name        = "${var.name}-config"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.config_path
  }
}

resource "docker_service" "app" {
  name = var.name

  task_spec {
    restart_policy = var.restart_policy

    networks = var.network_ids

    //    resources {
    //      reservation {
    //        memory_bytes = 200 * 1024e+3
    //        nano_cpus    = 1e+6
    //      }
    //
    //      limits {
    //        memory_bytes = 4000 * 1024e+3
    //      }
    //    }

    container_spec {
      image = docker_image.image.name
      env   = merge({
        UMASK      = 022
        PLEX_CLAIM = var.plex_claim
        VERSION    = var.plex_version
      }, var.env)

      mounts {
        source = docker_volume.config_volume.name
        target = "/config"
        type   = "volume"
      }

      dynamic "mounts" {
        for_each = local.mounts

        content {
          source = mounts.key
          target = mounts.value
          type   = "volume"
        }
      }
    }

    placement {
      constraints = [
        "node.role==manager"
      ]
    }

    log_driver {
      name = "json-file"
    }
  }

  endpoint_spec {
    dynamic "ports" {
      for_each = local.ports

      content {
        target_port    = ports.value
        published_port = ports.key
        protocol       = "tcp"
      }
    }

    dynamic "ports" {
      for_each = local.udp_ports

      content {
        target_port    = ports.value
        published_port = ports.key
        protocol       = "udp"
      }
    }
  }
}
