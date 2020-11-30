variable "port" {
  type        = number
  default     = 32400
  description = "WEBUI Port"
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
  description = "Plex library location"
}

variable "mounts" {
  type        = map(string)
  default     = {}
  description = "Media paths"
}
