variable "name" {
  type        = string
  default     = "code-server"
  description = "Service name"
}

variable "port" {
  type        = number
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  default     = []
  description = "Service networks"
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

variable "password" {
  type        = string
  default     = ""
  description = "WEBUI password"
}

variable "sudo_password" {
  type        = string
  default     = ""
  description = "Container `sudo` password. No `sudo` access if unset"
}

variable "mounts" {
  type        = map(string)
  default     = {}
  description = "Volume/mount map"
}
