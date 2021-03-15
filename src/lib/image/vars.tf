variable "name" {
  type        = string
  description = "Docker image"
}

variable "tag" {
  type        = string
  default     = "latest"
  description = "Docker image tag"
}
