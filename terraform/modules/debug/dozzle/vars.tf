variable "published_port" {
  type        = number
  default     = null
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  description = "Service networks"
}

variable "network_name" {
  type        = string
  description = "Router name"
}

variable "labels" {
  type        = map(string)
  default     = {}
  description = "Service Labels"
}
