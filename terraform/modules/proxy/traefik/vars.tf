variable "api_port" {
  type        = number
  default     = 8080
  description = "API Port"
}

variable "tag" {
  type        = string
  default     = "v2.3"
  description = "Image version tag"
}

variable "network_ids" {
  type        = list(string)
  default     = []
  description = "Docker Network IDs"
}

variable "config_yaml_path" {
  type        = string
  description = "traefik.yaml path"
}
