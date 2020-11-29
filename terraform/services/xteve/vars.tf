variable "port" {
  type        = number
  default     = 34400
  description = "Exposed Port"
}

variable "config_path" {
  type        = string
  description = "Config folder path"
}

variable "tmp_path" {
  type        = string
  default     = "/tmp/xteve"
  description = "tmp folder path"
}
