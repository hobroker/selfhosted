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

  prometheus = {
    port      = 9090
    etc_path  = "/appdata/prometheus/etc"
    data_path = "/appdata/prometheus/data"
  }
}
