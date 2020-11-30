variable "port" {
  type        = number
  default     = 8112
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  default     = []
  description = "Docker Network IDs"
}

variable "config_path" {
  type        = string
  default     = ""
  description = "Config folder path"
}

variable "blackhole_volume" {
  type        = string
  default     = ""
  description = "Blackhole volume"
}
