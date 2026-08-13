# `argocd`

> Declarative GitOps CD for Kubernetes

Source Code: https://github.com/argoproj/argo-cd

## Bootstrap

ArgoCD is bootstrapped once via plain Helm:

```sh
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update argo
helm upgrade --install argocd argo/argo-cd \
  --namespace argocd --create-namespace \
  -f values.yaml
```

After the initial bootstrap, ArgoCD manages itself — upgrades are done by bumping `targetRevision` in `application.yaml` and syncing via the UI.

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync argocd
```

## Deploying the rest of the platform

Once ArgoCD is running, deploy all system apps in the correct order with the root app-of-apps (run from the repo root):

```sh
kubectl apply -f bootstrap/system.yaml
```

This creates and auto-syncs metallb, longhorn, traefik, infisical-operator, reloader, and rancher in [sync-wave](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/) order. See [System App Order](../../../README.md#system-app-order) for the waves.

Workload apps are registered individually and synced manually:

```sh
kubectl apply -f apps/<category>/<app>/application.yaml
# then sync via the ArgoCD UI or: argocd app sync <app>
```

## CLI Access

Install the ArgoCD CLI: https://argo-cd.readthedocs.io/en/stable/cli_installation/

The server is exposed as a LoadBalancer on port 8082. Get the external IP:

```sh
kubectl get svc argocd-server -n argocd
argocd login <external-ip>:8082 --insecure
```
