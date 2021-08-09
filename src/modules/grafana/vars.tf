variable "name" {
  type        = string
  default     = "grafana"
  description = "Service name"
}

variable "tag" {
  type        = string
  default     = "7.5.0"
  description = "Image version tag"
}

variable "port" {
  type        = number
  description = "WEBUI Port"
}

variable "plugins" {
  type        = string
  default     = ""
  description = "Plugins"
}


variable "env" {
  type        = map(string)
  default     = {}
  description = "Environment variables"
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

variable "lib_path" {
  type        = string
  description = "lib folder path"
}

variable "etc_path" {
  type        = string
  description = "etc folder path"
}
