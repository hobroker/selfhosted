output "ports" {
  value = docker_service.dozzle.endpoint_spec[0].ports[*].published_port
}
