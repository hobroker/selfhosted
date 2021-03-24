variable "name" {
  type        = string
  default     = "plex"
  description = "Service name"
}

variable "port" {
  type        = number
  default     = 32400
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
    delay        = "15s"
    window       = "30s"
    max_attempts = 3
  }
  description = "Restart policy"
}

variable "plex_claim" {
  type        = string
  default     = ""
  description = "Config folder path"
}

variable "plex_version" {
  type        = string
  default     = ""
  description = "PLEX version"
}

variable "config_path" {
  type        = string
  description = "Config folder location"
}

variable "mounts" {
  type        = map(string)
  default     = {}
  description = "Volumes map"
}
