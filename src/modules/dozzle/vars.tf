variable "name" {
  type        = string
  default     = "dozzle"
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

variable "network_name" {
  type        = string
  default     = null
  description = "Service network name"
}

variable "labels" {
  type        = map(string)
  default     = {}
  description = "Labels"
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
