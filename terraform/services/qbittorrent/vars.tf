variable "port" {
  type        = number
  default     = 8112
  description = "WEBUI Port"
}

variable "config_path" {
  type        = string
  default     = ""
  description = "Config folder path"
}

variable "blackhole_path" {
  type        = string
  description = "Blackhole folder path"
}
