locals {
  name = "adguard"

  volumes = {
    "/opt/adguardhome/conf" = var.config_path
    "/opt/adguardhome/work" = var.data_path
  }
}

module "constants" {
  source = "../../../lib/constants"
}

resource "docker_image" "image" {
  name         = "adguard/adguardhome:latest"
  keep_locally = true
}

resource "docker_volume" "volumes" {
  for_each = local.volumes

  name        = "${local.name}-${reverse(split("/", each.key))[0]}"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = each.value
  }
}

resource "docker_service" "app" {
  name = local.name

  task_spec {
    restart_policy = module.constants.default_restart_policy

    networks = var.network_ids

    container_spec {
      image = docker_image.image.name
      env   = module.constants.default_container_env

      dynamic "mounts" {
        for_each = {
        for target, source in local.volumes :
        target => docker_volume.volumes[target].name}

        content {
          source = mounts.value
          target = mounts.key
          type   = "volume"
        }
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
