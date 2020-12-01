variable "port" {
  type        = number
  default     = 3579
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  description = "Service networks"
}

variable "tag" {
  type        = string
  default     = "latest"
  description = "Image version tag"

  validation {
    condition     = can(regex("(latest|development)", var.tag))
    error_message = "The `tag` must be one of: latest, development."
  }
}

variable "config_path" {
  type        = string
  default     = ""
  description = "Config folder path"
}
