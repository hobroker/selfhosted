locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.code-server
}

terraform {
  source = "../../modules/code-server"
}

dependency "storage" {
  config_path  = "../storage"
  mock_outputs = {
    appdata_volume = ""
  }
}

include {
  path = find_in_parent_folders()
}

inputs = merge(local.env, {
  mounts = {
    (dependency.storage.outputs.appdata_volume) = "/appdata"
  }
})
