variable "port" {
  type        = number
  default     = 8989
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  default     = []
  description = "Docker Network IDs"
}

variable "tag" {
  type        = string
  default     = "latest"
  description = "Image version tag"

  validation {
    condition     = can(regex("(latest|develop|preview)", var.tag))
    error_message = "The `tag` must be one of: latest, develop, preview."
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

variable "tv_path" {
  type        = string
  description = "TV Shows folder path"
}
