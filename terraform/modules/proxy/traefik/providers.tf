terraform {
  required_providers {
    docker = {
      source = "terraform-providers/docker"
    }
    aws    = {
      source = "hashicorp/aws"
    }
  }
}
