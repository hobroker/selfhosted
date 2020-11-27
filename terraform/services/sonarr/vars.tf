variable "port" {
  type        = number
  default     = 8989
  description = "WEBUI Port"
}

variable "volumes" {
  type        = object({
    config    = string
    downloads = string
    tv        = string
  })
  description = "Binded volumes"
}
