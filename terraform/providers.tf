terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
    }
//    vault  = {
//      source = "hashicorp/vault"
//    }
  }

  backend "remote" {
    organization = "hobroker"

    workspaces {
      name = "selfhosted"
    }
  }
}

provider "docker" {}

provider "vault" {}
