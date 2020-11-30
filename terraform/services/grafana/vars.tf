variable "port" {
  type        = number
  default     = 3002
  description = "WEBUI Port"
}

variable "tag" {
  type        = string
  default     = "latest"
  description = "Image version tag"
}

variable "config_path" {
  type        = string
  default     = ""
  description = "Config folder path"
}

variable "db_path" {
  type        = string
  default     = ""
  description = "Database file path"
}

variable "plugins" {
  type        = list(string)
  default     = []
  description = "Plugins list"
}
