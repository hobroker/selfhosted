variable "port" {
  type        = number
  description = "WEBUI Port"
}

variable "network_ids" {
  type        = list(string)
  default     = []
  description = "Service networks"
}

variable "etc_path" {
  type        = string
  description = "etc folder path"
}

variable "data_path" {
  type        = string
  description = "data folder path"
}
