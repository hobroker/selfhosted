resource "docker_volume" "downloads_volume" {
  name        = "storage-downloads"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.downloads_path
  }
}

resource "docker_volume" "torrents_volume" {
  name        = "storage-torrents"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.torrents_path
  }
}


resource "docker_volume" "appdata_volume" {
  name        = "storage-appdata"
  driver      = "local-persist"
  driver_opts = {
    mountpoint = var.appdata_path
  }
}