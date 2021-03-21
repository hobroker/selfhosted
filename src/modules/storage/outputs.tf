output "appdata_volume" {
  value = docker_volume.appdata_volume.name
}

output "downloads_volume" {
  value = docker_volume.downloads_volume.name
}

output "storage_volume" {
  value = docker_volume.storage_volume.name
}

output "torrents_volume" {
  value = docker_volume.torrents_volume.name
}
