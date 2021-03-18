locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.jackett
}

terraform {
  source = "../../modules/jackett"
}

dependency "storage" {
  config_path  = "../storage"
  mock_outputs = {
    torrents_volume = ""
  }
}

include {
  path = find_in_parent_folders()
}

inputs = merge(local.env, {
  torrents_volume = dependency.storage.outputs.torrents_volume
})
