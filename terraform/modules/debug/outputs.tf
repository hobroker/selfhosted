output "services" {
  value = [
    {
      name = "dozzle",
      port = module.dozzle.port
    },
    {
      name = "code-server",
      port = module.code-server.port
    },
  ]
}

output "network_ids" {
  value = local.networks
}
