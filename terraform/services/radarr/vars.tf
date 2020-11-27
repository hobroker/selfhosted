variable "port" {
  type        = number
  default     = 7878
  description = "WEBUI Port"
}

variable "volumes" {
  type        = object({
    config    = string
    downloads = string
    movies    = string
  })
  description = "Binded volumes"
}
