variable "published_port" {
  type        = number
  default     = null
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  description = "Service networks"
}

variable "network_name" {
  type        = string
  description = "Router name"
}

variable "labels" {
  type        = map(string)
  default     = {}
  description = "Service Labels"
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

variable "config_path" {
  type        = string
  default     = ""
  description = "Config path"
}

variable "mounts" {
  type        = map(string)
  default     = {}
  description = "Container binded files/folders"
}
