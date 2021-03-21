locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.radarr
}

terraform {
  source = "../../modules/radarr"
}

dependency "storage" {
  config_path  = "../storage"
  mock_outputs = {
    downloads_volume = ""
  }
}

include {
  path = find_in_parent_folders()
}

inputs = merge(local.env, {
  downloads_volume = dependency.storage.outputs.downloads_volume
})
