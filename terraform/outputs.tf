output "services" {
  value = concat(
  module.torrent.services,
  module.media.services,
  module.debug.services,
  module.privacy.services)
}
