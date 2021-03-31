locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.traefik
}

terraform {
  source = "../../modules/traefik"
}

include {
  path = find_in_parent_folders()
}

dependency "network" {
  config_path = "../network-traefik"

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
  mock_outputs                            = {
    id = "fake-id"
  }
}

dependency "debug-network" {
  config_path = "../network-debug"

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
  mock_outputs                            = {
    id = "fake-id"
  }
}

inputs = merge(local.env, {
  network_ids = [
    dependency.network.outputs.id,
    dependency.debug-network.outputs.id
  ]
})
