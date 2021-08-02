variable "name" {
  type        = string
  default     = "prometheus"
  description = "Service name"
}

variable "tag" {
  type        = string
  default     = "v2.28.1"
  description = "Image version tag"
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

variable "etc_path" {
  type        = string
  description = "etc folder path"
}

variable "data_path" {
  type        = string
  description = "data folder path"
}
