terraform {
  required_providers {
    docker = {
      source = "terraform-providers/docker"
    }
    vault  = {
      source = "hashicorp/vault"
    }
    aws    = {
      source = "hashicorp/aws"
    }
  }

  backend "s3" {
    bucket                      = "infra"
    key                         = "terraform.tfstate"
    region                      = "us-west-2"
    endpoint                    = "https://minio.hobroker.me"
    force_path_style            = true
    skip_credentials_validation = true
  }
}

provider "aws" {
  region                      = "us-west-2"
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  s3_force_path_style         = true

  endpoints {
    s3 = "https://minio.${var.domain}"
  }
}

provider "docker" {}

provider "vault" {}
