variable "name" {
  type        = string
  default     = "adguard"
  description = "Service name"
}

variable "port" {
  type        = number
  description = "WEBUI Port"
}

variable "env" {
  type        = map(string)
  default     = {
    PGID = "1000"
    PUID = "1000"
    TZ   = "Europe/Chisinau"
  }
  description = "Environment variables"
}

variable "config_path" {
  type        = string
  description = "Config folder path"
}

variable "data_path" {
  type        = string
  description = "Data folder path"
}
