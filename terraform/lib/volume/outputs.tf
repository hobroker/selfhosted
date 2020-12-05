output "name" {
  value = docker_volume.volume.name
}

output "target" {
  value = var.target_path
}
