resource "docker_network" "network" {
  name   = "${var.prefix}-network"
  driver = var.driver
}
