variable "proxy_network_id" {
  type        = string
  description = "Docker Network IDs"
}

variable "appdata_root" {
  type        = string
  default     = "/appdata"
  description = "Appdata root"
}

variable "hostname" {
  type        = string
  description = "Default hostname for subdomains"
}
