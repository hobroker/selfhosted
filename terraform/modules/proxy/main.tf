locals {
  name     = "proxy"
  networks = [docker_network.network.id]
}

resource "docker_network" "network" {
  name   = "${local.name}-network"
  driver = "overlay"
}

module "upload-traefik-yaml" {
  source = "../../lib/upload-file-ssh"

  ssh_host    = var.ssh_host
  ssh_user    = var.ssh_user
  ssh_key     = var.ssh_key
  destination = "${var.appdata_root}/traefik/traefik.yaml"
  content     = yamlencode({
    api       = {
      insecure  = true,
      dashboard = true,
      debug     = true
    }
    pilot     = {
      token = var.pilot_token
    }
    providers = {
      docker = {
        endpoint    = "unix:///var/run/docker.sock"
        defaultRule = "Host(`{{ .Name }}.${var.hostname}`)"
        swarmMode   = true
      }
    }
  })
}

module "traefik" {
  source = "./traefik"

  config_yaml_path = "${var.appdata_root}/traefik/traefik.yaml"
  network_ids      = local.networks
  api_port         = 8080
}
