output "services" {
  value = [
    {
      name = "sonarr",
      port = module.sonarr.port
    },
    {
      name = "radarr",
      port = module.radarr.port
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
  ]
}
