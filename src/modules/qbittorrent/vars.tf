variable "name" {
  type        = string
  default     = "qbittorrent"
  description = "Service name"
}

variable "port" {
  type        = number
  default     = 8112
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  default     = []
  description = "Service networks"
}

variable "restart_policy" {
  type        = object({
    condition    = string
    delay        = string
    window       = string
    max_attempts = number
  })
  default     = {
    condition    = "on-failure"
    delay        = "3s"
    window       = "10s"
    max_attempts = 3
  }
  description = "Restart policy"
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
  default     = ""
  description = "Config folder path"
}

variable "torrents_volume" {
  type        = string
  description = "Torrents blackhole volume"
}

variable "downloads_volume" {
  type        = string
  default     = ""
  description = "Downloads volume"
}
