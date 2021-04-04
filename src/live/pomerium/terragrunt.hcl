locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  pomerium_vars    = read_terragrunt_config(find_in_parent_folders("pomerium.hcl"))
  pomerium_env     = local.pomerium_vars.locals.env
  env              = local.environment_vars.locals.pomerium
}

terraform {
  source = "../../modules/pomerium"
}

include {
  path = find_in_parent_folders()
}

inputs = merge(local.env, {
  env = local.pomerium_env
})
