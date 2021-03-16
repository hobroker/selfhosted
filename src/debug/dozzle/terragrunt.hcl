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

inputs = {
  port = local.env.port
}
