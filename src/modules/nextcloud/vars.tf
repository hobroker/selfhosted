variable "name" {
  type        = string
  default     = "nextcloud"
  description = "Service name"
}

variable "tag" {
  type        = string
  default     = "latest"
  description = "Image version tag"
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

variable "config_path" {
  type        = string
  description = "config folder path"
}

variable "data_volume" {
  type        = string
  description = "data volume name"
}
