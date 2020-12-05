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
