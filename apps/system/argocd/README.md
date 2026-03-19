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

## Register / update the Application resourceing Services

Each service has an `application.yaml` co-located in its chart directory. Register services individually:

```sh
kubectl apply -f charts/<category>/<service>/application.yaml
```

Then sync via the ArgoCD UI. For system services, sync in this order:

1. `local-path-provisioner`
2. `traefik`
3. `infisical-operator`
4. `reloader` (optional)
5. `rancher` (optional)

## CLI Access

Install the ArgoCD CLI: https://argo-cd.readthedocs.io/en/stable/cli_installation/

The server is exposed as a LoadBalancer on port 8082. Get the external IP:

```sh
kubectl get svc argocd-server -n argocd
argocd login <external-ip>:8082 --insecure
```
