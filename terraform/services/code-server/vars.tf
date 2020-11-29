variable "port" {
  type        = number
  default     = 8084
  description = "WEBUI Port"
}

variable "password" {
  type        = string
  default     = ""
  description = "WEBUI password"
}

variable "sudo_password" {
  type        = string
  default     = ""
  description = "Container `sudo` password. No `sudo` access if unset"
}

variable "config_volume" {
  type        = string
  default     = ""
  description = "Config path"
}

variable "mounts" {
  type        = map(string)
  default     = {}
  description = "Container binded files/folders"
}
