output "services" {
  value = [
    {
      name = "jackett",
      port = module.jackett.port
    },
    {
      name = "qbittorrent",
      port = module.qbittorrent.port
    },
  ]
}

output "network_ids" {
  value = local.networks
}

