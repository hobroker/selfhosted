locals {
}

terraform {
//  source = "git::git@github.com:gruntwork-io/terragrunt-infrastructure-modules-example.git//mysql?ref=v0.4.0"
  source = "../../modules/httpbin"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  network_ids = []
  published_port = 9009
}
