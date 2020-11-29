variable "port" {
  type        = number
  default     = 8989
  description = "WEBUI Port"
}

variable "config_path" {
  type        = string
  description = "Config folder path"
}

variable "downloads_path" {
  type        = string
  description = "Downloads folder path"
}

variable "tv_path" {
  type        = string
  description = "TV Shows folder path"
}
