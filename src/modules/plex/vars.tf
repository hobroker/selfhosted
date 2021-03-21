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
