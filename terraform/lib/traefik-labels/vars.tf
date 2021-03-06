variable "name" {
  type        = string
  description = "Service name"
}

variable "port" {
  type        = string
  description = "Service port"
}

variable "network" {
  type        = string
  description = "Service network"
}

variable "enabled" {
  type        = bool
  default     = true
  description = "Enable Traefik Proxy"
}
