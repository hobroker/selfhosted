locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.code-server
}

terraform {
  source = "../..//modules/code-server"
}

dependency "appdata_storage" {
  config_path = "../_local/storage-appdata"

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
  mock_outputs                            = {
    volume = "mock-appdata-storage"
  }
}

dependency "compose_storage" {
  config_path = "../_local/storage-compose"

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
  mock_outputs                            = {
    volume = "mock-compose-storage"
  }
}

include {
  path = find_in_parent_folders()
}

inputs = merge(local.env, {
  mounts = {
    (dependency.appdata_storage.outputs.volume) = "/appdata",
    (dependency.compose_storage.outputs.volume) = "/compose"
  }
})
