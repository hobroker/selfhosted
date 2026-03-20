# `openclaw`

> AI assistant that connects to messaging platforms and executes tasks autonomously

Source Code: https://github.com/openclaw/openclaw
Chart: https://serhanekicii.github.io/openclaw-helm

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
helm repo add openclaw https://serhanekicii.github.io/openclaw-helm
helm repo update openclaw
helm upgrade --install openclaw openclaw/openclaw -f values.yaml
```

## Pairing a device

```sh
kubectl port-forward -n default svc/openclaw 18789:18789
# Open http://localhost:18789, enter the gateway token, click Connect

kubectl exec -n default deployment/openclaw -c main -- node dist/index.js devices list
kubectl exec -n default deployment/openclaw -c main -- node dist/index.js devices approve <REQUEST_ID>
```

## Storage

| source                | container path         | type       | description                            |
| --------------------- | ---------------------- | ---------- | -------------------------------------- |
| `/var/local/openclaw` | `/home/node/.openclaw` | `hostPath` | Config, sessions, and installed skills |

### Secrets

The following environment variables are required and sourced from the `infisical-openclaw-secret`:

| name                     | description                      |
| ------------------------ | -------------------------------- |
| `ANTHROPIC_API_KEY`      | Anthropic API key (`sk-ant-...`) |
| `OPENCLAW_GATEWAY_TOKEN` | Gateway token for device pairing |
