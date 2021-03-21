locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.plex
}

terraform {
  source = "../../modules/plex"
}

dependency "storage" {
  config_path  = "../storage"
  mock_outputs = {
    storage_volume = ""
  }
}

include {
  path = find_in_parent_folders()
}

inputs = merge(local.env, {
  mounts = {
    (dependency.storage.outputs.storage_volume) = "/storage"
  }
})
