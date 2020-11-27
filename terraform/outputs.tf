output "services" {
  value = [
    {
      name = "dozzle",
      port = module.dozzle.port
    },
    {
      name = "jackett",
      port = module.jackett.port
    },
  ]
}
