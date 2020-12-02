output "labels" {
  value = {
    "subdomain"                                                  = var.name
    "traefik.http.routers.${var.name}.service"                   = var.name
    "traefik.http.services.${var.name}.loadbalancer.server.port" = var.port
    "traefik.docker.network"                                     = var.network
  }
}
