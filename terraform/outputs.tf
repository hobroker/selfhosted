output "service_names" {
  // TODO add remaining modules
  value = concat(module.debug.service_names)
}

output "published_ports" {
  // TODO add remaining modules
  value = merge(module.debug.published_ports)
}
