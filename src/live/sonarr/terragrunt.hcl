locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.sonarr
}

terraform {
  source = "../../modules/sonarr"
}

dependency "downloads_storage" {
  config_path = "../_local/storage-downloads"

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
  mock_outputs                            = {
    volume = "mock-downloads-storage"
  }
}

include {
  path = find_in_parent_folders()
}

inputs = merge(local.env, {
  downloads_volume = dependency.downloads_storage.outputs.volume
})
