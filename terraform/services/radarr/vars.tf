variable "port" {
  type        = number
  default     = 7878
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

variable "movies_path" {
  type        = string
  description = "Movies folder path"
}
