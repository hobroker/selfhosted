terraform {
  required_providers {
    docker = {
      source = "terraform-providers/docker"
    }
    vault  = {
      source = "hashicorp/vault"
    }
  }
}

provider "docker" {}

provider "vault" {}
