variable "port" {
  type        = number
  default     = 9117
  description = "WEBUI Port"
}

variable "config_volume" {
  type        = string
  default     = ""
  description = "Config folder path"
}

variable "blackhole_volume" {
  type        = string
  description = "Blackhole folder path"
}
