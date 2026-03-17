# `openebs`

> OpenEBS Dynamic LocalPV Provisioner — host-local storage provisioner with a Retain storage class.

Source Code: https://github.com/openebs/dynamic-localpv-provisioner
Chart: https://openebs.github.io/dynamic-localpv-provisioner

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync openebs
```

## Storage

Data is stored on each node at `/var/local/openebs/<pvc-name>/`.

StorageClass: `openebs-hostpath` (ReclaimPolicy: Retain)
