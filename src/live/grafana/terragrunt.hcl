locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.grafana
}

terraform {
  source = "../../modules/grafana"
}

include {
  path = find_in_parent_folders()
}

inputs = merge(local.env, {
  plugins = "grafana-strava-datasource,grafana-worldmap-panel"
})
