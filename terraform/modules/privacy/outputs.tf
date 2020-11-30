output "services" {
  value = [
    {
      name = "adguard",
      port = module.adguard.port
    },
  ]
}
