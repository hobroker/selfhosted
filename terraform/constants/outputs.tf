output "default_restart_policy" {
  value = {
    condition    = "on-failure"
    delay        = "3s"
    window       = "10s"
    max_attempts = 3
  }
}

output "default_container_env" {
  value = {
    PGID = "1000"
    PUID = "1000"
    TZ   = "Europe/Chisinau"
  }
}

output "manager_constraints" {
  value = [
    "node.role==manager"
  ]
}
