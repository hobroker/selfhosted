# `local-path-retain`

> StorageClass based on local-path provisioner with Retain reclaim policy.

Source Code: https://github.com/rancher/local-path-provisioner

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync local-path-retain
```

### Manual (without ArgoCD)

```sh
kubectl apply -f local-path-retain.yaml
```
