variable "port" {
  type    = number
  default = 7878
}

variable "volumes" {
  type = object({
    config    = string
    downloads = string
    movies    = string
  })
}
