output "services" {
  value = [
    {
      name = "adguard",
      port = module.adguard.port
    },
  ]
}

output "network_ids" {
  value = local.networks
}
