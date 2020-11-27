variable "port" {
  type        = number
  default     = 8112
  description = "WEBUI Port"
}

variable "volumes" {
  type        = object({
    config    = string
    downloads = string
  })
  description = "Binded volumes"
}
