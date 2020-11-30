variable "port" {
  type        = number
  default     = 3001
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  default     = []
  description = "Docker Network IDs"
}

variable "config_path" {
  type        = string
  description = "Config folder path"
}

variable "data_path" {
  type        = string
  description = "Data folder path"
}