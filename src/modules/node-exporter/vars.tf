variable "name" {
  type        = string
  default     = "node-exporter"
  description = "Service name"
}

variable "port" {
  type        = number
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  default     = []
  description = "Service networks"
}
