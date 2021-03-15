output "network_id" {
  value = docker_network.network.id
}

output "published_ports" {
  value = {for name, port in {
    dozzle      = module.grafana.published_port
  }: name => port if name != null}
}
