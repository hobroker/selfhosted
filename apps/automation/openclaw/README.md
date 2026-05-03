# `openclaw`

> AI assistant that connects to messaging platforms and executes tasks autonomously

Source Code: https://gitlab.com/xrow-public/helm-openclaw
Chart: oci://registry.gitlab.com/xrow-public/helm-openclaw/charts/openclaw

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync openclaw
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm upgrade --install openclaw \
  oci://registry.gitlab.com/xrow-public/helm-openclaw/charts/openclaw \
  --version 1.17.2 \
  -f values.yaml
```

## Pairing a device

```sh
# Read the auto-generated gateway token
kubectl get secret -n default openclaw-token -o jsonpath='{.data.token}' | base64 -d; echo

# Forward the UI
kubectl port-forward -n default svc/openclaw 18789:18789
# Open http://localhost:18789, paste the token, click Connect
```

## Storage

| source                | container path                | type       | description                            |
| --------------------- | ----------------------------- | ---------- | -------------------------------------- |
| `/var/local/openclaw` | `/opt/app-root/src/.openclaw` | `hostPath` | Config, sessions, and installed skills |
