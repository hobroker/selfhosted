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
    {
      name = "tautulli",
      port = module.tautulli.port
    },
    {
      name = "xteve",
      port = module.xteve.port
    },
    {
      name = "plex",
      port = module.plex.port
    },
    {
      name = "ombi",
      port = module.ombi.port
    },
    //    {
    //      name = "grafana",
    //      port = module.grafana.port
    //    },
  ]
}
