output "services" {
  value = concat(
  module.proxy.services,
  module.torrent.services,
  module.media.services,
  module.debug.services,
  module.privacy.services)
}
