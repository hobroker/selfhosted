locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  env              = local.environment_vars.locals.dozzle
  name             = "dozzle"
}

terraform {
  source = "../../modules/dozzle"
}

include {
  path = find_in_parent_folders()
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
  name        = local.name
  network_ids = [dependency.traefik-network.outputs.id]
  labels      = {
    "traefik.enable"                                               = true
    "subdomain"                                                    = local.name
    "path"                                                         = local.name
    "traefik.http.routers.${local.name}.service"                   = local.name
    "traefik.http.services.${local.name}.loadbalancer.server.port" = local.env.port
  }
})
