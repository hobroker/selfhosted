variable "prefix" {
  type        = string
  description = "Network name prefix"
}

variable "driver" {
  type        = string
  default     = "overlay"
  description = "Docker Network Driver"
}
