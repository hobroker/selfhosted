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
  value = {for name, port in {
    dozzle      = module.dozzle.published_port
    code-server = module.code-server.published_port
  }: name => port if name != null}
}
