remote_state {
  backend = "gcs"

  config = {
    project = "my-nas-295409"
    bucket  = "tf-state-selfhosted"
    prefix  = "state/${path_relative_to_include()}"
  }
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = file("provider.tf")
}
