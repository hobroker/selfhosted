data "template_file" "traefik_yaml_tpl" {
  template = file("${path.module}/config/traefik.yaml.tpl")

  vars = {
    pilot_token = var.pilot_token
    hostname    = var.hostname
  }
}

resource "docker_config" "traefik_yaml" {
  name = "traefik_yaml-${replace(timestamp(),":", ".")}"
  data = base64encode(data.template_file.traefik_yaml_tpl.rendered)

  lifecycle {
    ignore_changes        = [name]
    create_before_destroy = true
  }
}
