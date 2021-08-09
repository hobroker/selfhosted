variable "name" {
  type        = string
  default     = "adguard-exporter"
  description = "Service name"
}

variable "port" {
  type        = number
  description = "API Port"
}

variable "adguard_hostname" {
  type        = string
  description = "Adguard hostname"
}

variable "adguard_username" {
  type        = string
  description = "Adguard username"
}

variable "adguard_password" {
  type        = string
  sensitive   = true
  description = "Adguard password"
}

variable "adguard_port" {
  type        = string
  description = "Adguard port"
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
