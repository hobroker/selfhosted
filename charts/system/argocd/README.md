`argocd`

> Declarative GitOps CD for Kubernetes

Source Code: https://github.com/argoproj/argo-cd

## Bootstrap

ArgoCD is bootstrapped via plain Helm (not Helmfile):

```sh
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update argo
helm upgrade --install argocd argo/argo-cd \
  --namespace argocd --create-namespace \
  -f values.yaml
```

## Register Applications

Once ArgoCD is running, apply all `application.yaml` manifests:

```sh
find charts/ -name "application.yaml" | xargs kubectl apply -f
```

Then sync services manually via the ArgoCD UI or CLI.
Sync system services first, in this order:

1. `local-path-retain`
2. `cert-manager`
3. `traefik`
4. `infisical-operator`
5. `reloader`
6. `rancher` (optional)

After the initial bootstrap, ArgoCD manages itself — upgrades are done by
bumping `targetRevision` in `application.yaml` and syncing via the UI.

## CLI Access

The server is exposed as a LoadBalancer on port 8082. Get the external IP:

```sh
kubectl get svc argocd-server -n argocd
argocd login <external-ip>:8082 --insecure
```
