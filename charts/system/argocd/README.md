`argocd`

> Declarative GitOps CD for Kubernetes.

Source Code: https://github.com/argoproj/argo-cd

## Bootstrap

ArgoCD is bootstrapped via plain Helm (not Helmfile):

```sh
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update
kubectl create namespace argocd
helm install argocd argo/argo-cd \
  --namespace argocd \
  --version 7.8.23 \
  -f charts/system/argocd/values.yaml
```

## Register Applications

Once ArgoCD is running, apply all Application manifests to register services:

```sh
kubectl apply -f argocd-apps/ -R
```

Then sync services manually via the ArgoCD UI or CLI (`argocd app sync <name>`).
Sync system services first, in this order:

1. `cert-manager`
2. `traefik`
3. `infisical`
4. `reloader`
5. `rancher` (optional)

## Upgrade ArgoCD itself

```sh
helm upgrade argocd argo/argo-cd \
  --namespace argocd \
  --version <new-version> \
  -f charts/system/argocd/values.yaml
```

## Secrets

None required by ArgoCD itself. Configure SSO or admin password via `configs.secret` in `values.yaml` if needed.
