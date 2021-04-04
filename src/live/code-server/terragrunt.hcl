locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.code-server
}

terraform {
  source = "../../modules/code-server"
}

include {
  path = find_in_parent_folders()
}

dependency "appdata_storage" {
  config_path = "../_local/storage-appdata"

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
  mock_outputs                            = {
    volume = "mock-appdata-storage"
  }
}

dependency "traefik-network" {
  config_path = "../network-traefik"

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
  mock_outputs                            = {
    id   = "fake-id"
    name = "fake-name"
  }
}

inputs = merge(local.env, {
  network_ids  = [dependency.traefik-network.outputs.id]
  network_name = dependency.traefik-network.outputs.name
  mounts       = {
    (dependency.appdata_storage.outputs.volume) = "/appdata"
  }
})
