variable "port" {
  type        = number
  default     = 7878
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


variable "tag" {
  type        = string
  default     = "latest"
  description = "Image version tag"

  validation {
    condition     = can(regex("(latest|develop|nightly)", var.tag))
    error_message = "The `tag` must be one of: latest, develop, nightly."
  }
}

variable "downloads_volume" {
  type        = string
  description = "Downloads volume"
}

variable "config_path" {
  type        = string
  description = "Config folder path"
}

variable "movies_path" {
  type        = string
  description = "Movies folder path"
}
