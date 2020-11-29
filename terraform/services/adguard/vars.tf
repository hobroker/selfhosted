variable "port" {
  type        = number
  default     = 3001
  description = "WEBUI Port"
}

variable "config_volume" {
  type        = string
  description = "Config folder path"
}

variable "data_volume" {
  type        = string
  description = "Data folder path"
}
