terraform {
  required_providers {
    docker = {
      source = "terraform-providers/docker"
    }
  }
}

provider "docker" {
  host      = var.docker_host
  cert_path = "certs"
}

module "dozzle" {
  source    = "./modules/dozzle"
  port      = 8888
}
