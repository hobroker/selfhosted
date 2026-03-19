---
description: AI assistant that connects to messaging platforms and executes tasks autonomously
sourceCode: https://github.com/openclaw/openclaw
chart: https://serhanekicii.github.io/openclaw-helm
---

## Secrets

Add the following secrets to Infisical under `/openclaw`:

| Key                      | Description                      |
| ------------------------ | -------------------------------- |
| `ANTHROPIC_API_KEY`      | Anthropic API key (`sk-ant-...`) |
| `OPENCLAW_GATEWAY_TOKEN` | Gateway token for device pairing |

## Storage

| source                | container path         | type       | description                            |
| --------------------- | ---------------------- | ---------- | -------------------------------------- |
| `/var/local/openclaw` | `/home/node/.openclaw` | `hostPath` | Config, sessions, and installed skills |

PV: `openclaw-data-pv` → PVC: `openclaw-data-pvc`

## Pairing a device

```sh
kubectl port-forward -n default svc/openclaw 18789:18789
# Open http://localhost:18789, enter the gateway token, click Connect

kubectl exec -n default deployment/openclaw -c main -- node dist/index.js devices list
kubectl exec -n default deployment/openclaw -c main -- node dist/index.js devices approve <REQUEST_ID>
```
