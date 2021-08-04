locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.adguard-exporter
}

terraform {
  source = "../..//modules/adguard-exporter"
}

include {
  path = find_in_parent_folders()
}

inputs = merge(local.env, {
  adguard_hostname = "172.17.0.1"
  adguard_username = "admin"
//  adguard_password = ""
  adguard_port = local.environment_vars.locals.adguard.port
})
