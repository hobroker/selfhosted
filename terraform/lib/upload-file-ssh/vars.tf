variable "content" {
  type        = string
  description = "File content"
}

variable "destination" {
  type        = string
  description = "Destination path"
}

variable "ssh_host" {
  type        = string
  description = "SSH host"
}

variable "ssh_user" {
  type        = string
  description = "SSH user"
}

variable "ssh_key" {
  type        = string
  description = "SSH key path"
}
