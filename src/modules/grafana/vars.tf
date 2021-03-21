variable "port" {
  type        = number
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  default     = []
  description = "Service networks"
}

variable "lib_path" {
  type        = string
  description = "lib folder path"
}

variable "etc_path" {
  type        = string
  description = "etc folder path"
}
