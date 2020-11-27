variable "port" {
  type    = number
  default = 9117
}

variable "volumes" {
  type = object({
    config    = string
    downloads = string
  })
}
