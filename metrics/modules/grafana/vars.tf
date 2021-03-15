variable "published_port" {
  type        = number
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

variable "lib_path" {
  type        = string
  description = "lib folder path"
}

variable "etc_path" {
  type        = string
  description = "etc folder path"
}
