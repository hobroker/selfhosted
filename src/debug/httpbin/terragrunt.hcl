terraform {
  source = "../../modules/httpbin"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  network_ids = []
  published_port = 9009
}
