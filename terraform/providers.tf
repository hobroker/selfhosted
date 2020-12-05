terraform {
  required_providers {
    docker = {
      source = "terraform-providers/docker"
    }
    vault  = {
      source = "hashicorp/vault"
    }
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
