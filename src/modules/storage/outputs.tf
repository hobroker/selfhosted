output "downloads_volume" {
  value = docker_volume.downloads_volume.name
}

output "torrents_volume" {
  value = docker_volume.torrents_volume.name
}
