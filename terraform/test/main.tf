locals {
  port = 4000 + try(local.one, 1)
}

resource "docker_network" "network" {
  name   = "port-${local.port}"
  driver = "overlay"
}
