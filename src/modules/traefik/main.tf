locals {
  name = "traefik"
  port = 8080

  ports = var.api_port == null ? {
    80 = 80
  } : {
    80             = 80,
    (var.api_port) = local.port
  }
}

data "docker_registry_image" "image" {
  name = "traefik:${var.tag}"
}

resource "docker_image" "image" {
  name          = data.docker_registry_image.image.name
  pull_triggers = [data.docker_registry_image.image.sha256_digest]
}

resource "docker_service" "app" {
  name = local.name

  task_spec {
    restart_policy = var.restart_policy

    networks = var.network_ids

    container_spec {
      image = docker_image.image.name
      env   = var.env

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

      mounts {
        target = "/certs"
        source = "/appdata/pomerium/sync/certs"
        type   = "bind"
      }

      hosts {
        host = "host.docker.internal"
        ip   = "172.17.0.1"
      }
    }

    placement {
      platforms {
        architecture = "amd64"
        os           = "linux"
      }

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
  }
}
