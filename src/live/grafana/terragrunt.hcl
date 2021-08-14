locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  domain           = local.environment_vars.locals.domain
  env              = local.environment_vars.locals.grafana
}

terraform {
  source = "../..//modules/grafana"
}

include {
  path = find_in_parent_folders()
}

inputs = merge(local.env, {
  tag     = "8.1.1"
  plugins = join(",", [
    "grafana-strava-datasource",
    "grafana-worldmap-panel",
    "grafana-piechart-panel",
    "grafana-googlesheets-datasource"
  ])
  env     = {
    GF_SERVER_ROOT_URL     = "https://${local.domain}.hobroker.me",
    GF_STRAVA_DS_DATA_PATH = "/var/lib/grafana/strava"
  }
})
ß
