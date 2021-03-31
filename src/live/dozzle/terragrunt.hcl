locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.dozzle
}

terraform {
  source = "../../modules/dozzle"
}

include {
  path = find_in_parent_folders()
}

dependency "network" {
  config_path = "../network-debug"

  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
  mock_outputs                            = {
    id   = "fake-id"
    name = "fake-name"
  }
}

inputs = merge(local.env, {
  network_ids  = [dependency.network.outputs.id]
  network_name = dependency.network.outputs.name
})
