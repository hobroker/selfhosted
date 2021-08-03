locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.adguard
}

terraform {
  source = "../..//modules/adguard"
}

include {
  path = find_in_parent_folders()
}

inputs = local.env
