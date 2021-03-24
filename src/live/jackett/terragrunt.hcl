locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.jackett
}

terraform {
  source = "../../modules/jackett"
}

dependency "torrents_storage" {
  config_path = "../_local/storage-torrents-blackhole"

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
  mock_outputs                            = {
    volume = "torrents_storage"
  }
}

include {
  path = find_in_parent_folders()
}

inputs = merge(local.env, {
  torrents_volume = dependency.torrents_storage.outputs.volume
})
