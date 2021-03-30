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

dependency "network" {
  config_path = "../network-torrents"

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
  mock_outputs                            = {
    id = "fake-id"
  }
}

include {
  path = find_in_parent_folders()
}

inputs = merge(local.env, {
  network_ids     = [dependency.network.outputs.id]
  torrents_volume = dependency.torrents_storage.outputs.volume
})
