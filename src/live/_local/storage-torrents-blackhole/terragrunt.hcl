locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("mounts.hcl"))
  env              = local.environment_vars.locals
}

terraform {
  source = "../../../modules/local-mount"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  name       = "storage-torrents-blackhole"
  mountpoint = local.env.torrents_path
}
