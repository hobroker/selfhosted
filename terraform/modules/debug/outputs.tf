output "network_id" {
  value = docker_network.network.id
}

output "service_names" {
  value = [
    module.dozzle.name,
    module.code-server.name
  ]
}

output "published_ports" {
  value = {
    dozzle      = module.dozzle.published_port
    code-server = module.code-server.published_port
  }
}
