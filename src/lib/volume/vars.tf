variable "name" {
  type        = string
  description = "Volume name"
}

variable "path" {
  type        = string
  description = "Location on disk"
}

variable "target_path" {
  type        = string
  default     = null
  description = "Target path"
}
