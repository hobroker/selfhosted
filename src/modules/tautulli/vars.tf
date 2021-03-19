variable "port" {
  type        = number
  default     = 8181
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  default     = []
  description = "Service networks"
}

variable "config_path" {
  type        = string
  description = "Config folder path"
}
