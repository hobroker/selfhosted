variable "network_ids" {
  type        = list(string)
  description = "Service networks"
}

variable "traefik_yaml_path" {
  type        = string
  default     = "/appdata"
  description = "Appdata root"
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

variable "hostname" {
  type        = string
  description = "Default hostname for subdomains"
}
