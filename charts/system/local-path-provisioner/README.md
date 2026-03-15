# `local-path-provisioner`

> Local path provisioner with a Retain storage class for persistent storage on node local disks.

Source Code: https://github.com/rancher/local-path-provisioner
Chart: https://github.com/rancher/local-path-provisioner/tree/master/deploy/chart/local-path-provisioner

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync local-path-provisioner
```

## Storage

Data is stored on each node at `/var/local/local-path/<pvc-name>/`.

StorageClass: `local-path-retain` (ReclaimPolicy: Retain)
