resource "null_resource" upload_file {
  triggers = {
    once = md5(var.content)
  }

  provisioner "remote-exec" {
    inline = [
      "cat << \\EOT > ${var.destination}",
      var.content
    ]

    connection {
      type        = "ssh"
      host        = var.ssh_host
      user        = var.ssh_user
      private_key = file(var.ssh_key)
      timeout     = "15s"
    }
  }
}
