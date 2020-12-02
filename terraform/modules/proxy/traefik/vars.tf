variable "api_port" {
  type        = number
  description = "API Port"
}

variable "tag" {
  type        = string
  default     = "v2.3"
  description = "Image version tag"
}

variable "network_ids" {
  type        = list(string)
  description = "Service networks"
}

variable "pilot_token" {
  type        = string
  default     = ""
  description = "Traefik pilot.token"
}

variable "hostname" {
  type        = string
  description = "Default hostname for subdomains"
}
