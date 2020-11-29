variable "port" {
  type        = number
  default     = 8084
  description = "WEBUI Port"
}

variable "config_volume" {
  type        = string
  default     = ""
  description = "App config path"
}

variable "mounts" {
  type        = map(string)
  default     = {}
  description = "Container binded files/folders"
}
