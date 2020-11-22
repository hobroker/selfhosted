terraform {
  required_providers {
    docker = {
      source = "terraform-providers/docker"
    }
  }
}

resource "docker_network" "network" {
  name   = "debug-net"
  driver = "overlay"
}

resource "docker_image" "image" {
  name         = "amir20/dozzle:latest"
  keep_locally = true
}

resource "docker_service" "dozzle" {
  name = "dozzle"

  task_spec {
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

    restart_policy = {
      condition    = "on-failure"
      delay        = "3s"
      max_attempts = 5
      window       = "10s"
    }

    placement {
      constraints = [
        "node.role==manager"
      ]
    }

    networks = [
      docker_network.network.id
    ]

    log_driver {
      name = "json-file"
    }
  }

  endpoint_spec {
    ports {
      target_port    = 8080
      published_port = var.port
      protocol       = "tcp"
      publish_mode   = "ingress"
    }
  }
}
