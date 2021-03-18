locals {
  httpbin = {
    port = 9009
  }

  dozzle = {
    port = 9010
  }

  grafana = {
    port     = 5000
    lib_path = "/appdata/grafana/lib"
    etc_path = "/appdata/grafana/etc"
  }
}
