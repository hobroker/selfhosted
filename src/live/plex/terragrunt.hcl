locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.plex
}

terraform {
  source = "../../modules/plex"
}

dependency "storage_root" {
  config_path = "../_local/storage-root"

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
  mock_outputs                            = {
    volume = "mock-root-storage"
  }
}

include {
  path = find_in_parent_folders()
}

inputs = merge(local.env, {
  mounts = {
    (dependency.storage_root.outputs.volume) = "/storage"
  }
})
