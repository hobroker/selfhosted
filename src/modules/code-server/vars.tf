variable "port" {
  type        = number
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  default     = []
  description = "Service networks"
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

variable "mounts" {
  type        = map(string)
  default     = {}
  description = "Volume/mount map"
}
