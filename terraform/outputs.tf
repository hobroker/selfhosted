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
    {
      name = "qbittorrent",
      port = module.qbittorrent.port
    },
    {
      name = "sonarr",
      port = module.sonarr.port
    },
    {
      name = "radarr",
      port = module.radarr.port
    },
    {
      name = "code-server",
      port = module.code-server.port
    },
    {
      name = "adguard",
      port = module.adguard.port
    },
  ]
}
