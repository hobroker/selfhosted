# `hermes`

> Personal AI agent that connects to messaging platforms and runs tasks autonomously

Source Code: https://github.com/NousResearch/hermes-agent

The pod runs two containers from the same image, mirroring the upstream
`docker-compose.yml`:

- **`main`** — the gateway (`gateway run`), which connects out to your
  messaging platforms and runs the agent.
- **`dashboard`** — the web UI (`dashboard --host 127.0.0.1 --no-open`), used to
  configure the model, tools and gateways.

Both share the `/opt/data` volume, so configuration written by either one is
visible to the other.

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync hermes
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install hermes bjw-s/app-template -f values.yaml
```

## First-time setup

You do **not** need to configure Hermes elsewhere and copy the config in — set it
up in-cluster. All state lives in `/opt/data`, which is the `hermes` PVC
(host path `/var/local/hermes`), so it survives restarts and upgrades.

On a fresh volume the config is empty. The `dashboard` container is a plain web
UI and stays up regardless, so use it (or its container shell) to write the
initial config; the `main` gateway will pick it up on its next restart.

```sh
# Option A - run the setup wizard against the persistent volume:
kubectl exec -it -n default deployment/hermes -c dashboard -- hermes setup

# Option B - use the dashboard UI:
kubectl port-forward -n default deployment/hermes 9119:9119
# open http://localhost:9119 and configure the model, tools and gateways

# After config exists, restart so the gateway loads it:
kubectl rollout restart -n default deployment/hermes
```

> The `main` gateway may `CrashLoopBackOff` until a model/config exists in
> `/opt/data` — that is expected on a brand-new volume. Configure via the
> `dashboard` container as above, then it settles.

## Accessing the dashboard

The dashboard binds to `127.0.0.1` only and has no authentication, so it is not
exposed through Traefik. Reach it over a port-forward instead:

```sh
kubectl port-forward -n default deployment/hermes 9119:9119
# open http://localhost:9119
```

## Secrets (optional)

The interactive wizard/dashboard stores provider API keys in `/opt/data`, so no
Kubernetes secret is required to get started. The `infisical-hermes-secret`
(Infisical path `/hermes`) is wired into the gateway via `envFrom` for the
optional env-based integrations documented upstream — e.g. `API_SERVER_KEY` /
`API_SERVER_HOST` for the OpenAI-compatible API server, and the `TEAMS_*` /
`GOOGLE_CHAT_*` variables. Leave the Infisical path empty if you don't use them.

## Storage

| source              | container path | type       | description                                  |
| ------------------- | -------------- | ---------- | -------------------------------------------- |
| `/var/local/hermes` | `/opt/data`    | `hostPath` | Config, agent profiles, sessions, and skills |
