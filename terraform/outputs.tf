output "services" {
  value = concat([
    {
      name = "dozzle",
      port = module.dozzle.port
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
  ], module.torrent.services)
}
