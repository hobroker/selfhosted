output "service_names" {
  // TODO add remaining modules
  value = concat(module.debug.service_names)
}

output "published_ports" {
  // TODO add remaining modules
  value = {for name, port in merge(module.debug.published_ports):
  name => port if port != null}
}
