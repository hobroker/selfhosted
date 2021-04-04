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
  default     = []
  description = "Service networks"
}

variable "network_name" {
  type        = string
  default     = null
  description = "Service network name"
}

variable "restart_policy" {
  type        = object({
    condition    = string
    delay        = string
    window       = string
    max_attempts = number
  })
  default     = {
    condition    = "on-failure"
    delay        = "3s"
    window       = "10s"
    max_attempts = 3
  }
  description = "Restart policy"
}

variable "env" {
  type        = map(string)
  default     = {
    PGID = "1000"
    PUID = "1000"
    TZ   = "Europe/Chisinau"
  }
  description = "Environment variables"
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
