variable "port" {
  type    = number
  default = 8112
}

variable "volumes" {
  type = object({
    config    = string
    downloads = string
  })
}
