locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.prometheus
}

terraform {
  source = "../..//modules/prometheus"
}

include {
  path = find_in_parent_folders()
}

inputs = local.env
