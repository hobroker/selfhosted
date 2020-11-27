variable "port" {
  type        = number
  default     = 9117
  description = "WEBUI Port"
}

variable "volumes" {
  type        = object({
    config    = string
    downloads = string
  })
  description = "Binded volumes"
}
