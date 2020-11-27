variable "port" {
  type    = number
  default = 8989
}

variable "volumes" {
  type = object({
    config    = string
    downloads = string
    tv        = string
  })
}
