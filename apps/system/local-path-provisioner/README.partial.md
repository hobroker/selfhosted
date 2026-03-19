---
description: Local path provisioner with a Retain storage class for persistent storage on node local disks.
sourceCode: https://github.com/rancher/local-path-provisioner
chart: https://github.com/rancher/local-path-provisioner/tree/master/deploy/chart/local-path-provisioner
---

## Storage

Data is stored on each node at `/var/local/local-path/<pvc-name>/`.

StorageClass: `local-path-retain` (ReclaimPolicy: Retain)
