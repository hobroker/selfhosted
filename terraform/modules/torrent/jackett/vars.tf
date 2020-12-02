variable "port" {
  type        = number
  default     = 9117
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  description = "Service networks"
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
