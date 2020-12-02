variable "domain" {
  type        = string
  description = "The domain where the sevices will be deployed (ex: corp.com)"
}

variable "appdata_root" {
  type        = string
  default     = "/appdata"
  description = "Appdata root"
}

variable "storage_root" {
  type        = string
  default     = "/storage"
  description = "Storage root"
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

variable "pilot_token" {
  type        = string
  default     = ""
  description = "Traefik pilot.token"
}
