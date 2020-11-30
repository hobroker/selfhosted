variable "port" {
  type        = number
  default     = 3579
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
