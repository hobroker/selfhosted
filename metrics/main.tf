locals {
  name = "grafana"
  networks = [
    docker_network.network.id]
}

resource "docker_network" "network" {
  name = "${local.name}-network"
  driver = "overlay"
}

module "grafana" {
  source = "./modules/grafana"

  network_ids = local.networks
  network_name = docker_network.network.name
  lib_path = "${var.appdata_root}/grafana/lib"
  etc_path = "${var.appdata_root}/grafana/etc"
  published_port = 5000
}


module "prometheus" {
  source = "./modules/prometheus"

  network_ids = local.networks
  network_name = docker_network.network.name
  etc_path = "${var.appdata_root}/prometheus/etc"
  data_path = "${var.appdata_root}/prometheus/data"
  published_port = 9090
}
