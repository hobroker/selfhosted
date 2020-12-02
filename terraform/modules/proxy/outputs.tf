output "services" {
  value = [
    {
      name = "traefik",
      port = module.traefik.port
      test = "value"
    },
  ]
}

output "network_id" {
  value = local.networks[0]
}

