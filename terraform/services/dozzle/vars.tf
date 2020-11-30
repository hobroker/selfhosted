variable "port" {
  type        = number
  default     = 8888
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  default     = []
  description = "Docker Network IDs"
}
