locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.nextcloud
}

terraform {
  source = "../..//modules/nextcloud"
}

include {
  path = find_in_parent_folders()
}

dependency "storage_nextcloud" {
  config_path = "../_local/storage-nextcloud"

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
  mock_outputs                            = {
    volume = "mock-nextcloud-storage"
  }
}

inputs = merge(local.env, {
  data_volume = dependency.storage_nextcloud.outputs.volume
})
