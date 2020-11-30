variable "port" {
  type        = number
  default     = 7878
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  default     = []
  description = "Docker Network IDs"
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
