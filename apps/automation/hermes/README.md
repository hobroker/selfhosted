# `hermes`

> Personal AI agent that connects to messaging platforms and runs tasks autonomously

Source Code: https://github.com/NousResearch/hermes-agent

The pod runs two containers from the same image, mirroring the upstream
`docker-compose.yml`:

- **`main`** — the gateway (`gateway run`), which connects out to your
  messaging platforms and runs the agent.
- **`dashboard`** — the web UI (`dashboard --host 0.0.0.0 --no-open`), used to
  configure the model, tools and gateways. Exposed on the LAN and via
  `hermes.hobroker.me`, always behind the bundled username/password auth
  (see [Accessing the dashboard](#accessing-the-dashboard)).

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

Both the **provider key** and the **model selection** are set through the
dashboard and stored on the PVC (`/opt/data`) — keys in `.env`, model in
`config.yaml`. Set them once via the wizard, `hermes` CLI, or the dashboard UI.
This repo uses DeepSeek:

```sh
# Option A - run the setup wizard against the persistent volume:
kubectl exec -it -n default deployment/hermes -c dashboard -- hermes setup

# Option B - select DeepSeek non-interactively (key comes from DEEPSEEK_API_KEY):
kubectl exec -it -n default deployment/hermes -c dashboard -- \
  hermes config set model deepseek/deepseek-chat

# Option C - use the dashboard UI at http://192.168.50.205:9119
# (see "Accessing the dashboard" below) and configure the model, tools and gateways

# After config exists, restart so the gateway loads it:
kubectl rollout restart -n default deployment/hermes
```

> The `main` gateway may `CrashLoopBackOff` until a model/config exists in
> `/opt/data` — that is expected on a brand-new volume. Configure via the
> `dashboard` container as above, then it settles.

## Accessing the dashboard

The dashboard is reachable two ways.

**1. Traefik ingress** — <https://hermes.hobroker.me>

**2. MetalLB LoadBalancer IP on the LAN** (same pattern as AdGuard Home and
Plex), kept as a fallback for when DNS or Cloudflare Access is misconfigured:

<http://192.168.50.205:9119>

Binding to a non-loopback host engages the dashboard's
[fail-closed auth gate](https://hermes-agent.nousresearch.com/docs/user-guide/features/web-dashboard):
it **refuses to start** unless an auth provider is configured (`--insecure`
would bypass it, but is never used here). The bundled username/password
provider is enabled by the `HERMES_DASHBOARD_BASIC_AUTH_*` vars, which live in
`/opt/data/.env` on the PVC — set them via the dashboard's **API Keys** page.
If they are missing the dashboard container crashloops. Verify the gate is up:

```sh
curl -s http://192.168.50.205:9119/api/status | jq '.auth_required, .auth_providers'
# true
# ["basic"]
```

### Before the ingress is usable

The ingress only creates the Traefik route. Two things live outside this repo
and must be done in the Cloudflare dashboard, **in this order**:

1. Create the **Cloudflare Access application** for `hermes.hobroker.me` with
   the same policy used by the other apps.
2. Only then create the **DNS record** for `hermes.hobroker.me`.

Doing these in the other order publishes the dashboard with nothing but the
bundled basic auth in front of it. That matters more here than for the \*arr
apps: this container has a root shell, the provider API key, and an agent that
executes tasks. Verify the gate is live before relying on it:

```sh
curl -sI https://hermes.hobroker.me | grep -i '^location'
# expect a redirect to hobroker.cloudflareaccess.com
```

A port-forward still works as an alternative:

```sh
kubectl port-forward -n default deployment/hermes 9119:9119
# open http://localhost:9119
```

## Root access

The image has no `USER` directive — s6-overlay's `/init` runs as root and only
the supervised services drop to the unprivileged `hermes` user. So
`kubectl exec -it -n default deployment/hermes -c main -- bash` gives a **root**
shell directly, even though the agent's own commands run as `hermes`.

## Secrets & config

There is no external secret injection. All keys and settings are entered through
the dashboard and persisted on the PVC (`/opt/data`), so they survive restarts
and upgrades:

| Key / setting                          | Where                     | Purpose                                                                                        |
| -------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------- |
| `DEEPSEEK_API_KEY`                     | `.env` (API Keys page)    | LLM provider key — DeepSeek ([platform.deepseek.com](https://platform.deepseek.com/api_keys)). |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | `.env` (API Keys page)    | Dashboard login username — required or the LAN-bound dashboard fails closed at startup.        |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | `.env` (API Keys page)    | Dashboard login password.                                                                      |
| `HERMES_DASHBOARD_BASIC_AUTH_SECRET`   | `.env` (API Keys page)    | Session-signing secret, 32+ random bytes: `openssl rand -base64 32`.                           |
| `model`                                | `config.yaml` (Config UI) | e.g. `deepseek/deepseek-chat`.                                                                 |

Optional integration keys, only needed for the matching upstream gateway, go in
the same `.env`: `API_SERVER_KEY` / `API_SERVER_HOST` (OpenAI-compatible API
server), `TEAMS_*` (Microsoft Teams), `GOOGLE_CHAT_*` (Google Chat).

## Storage

| source              | container path | type       | description                                  |
| ------------------- | -------------- | ---------- | -------------------------------------------- |
| `/var/local/hermes` | `/opt/data`    | `hostPath` | Config, agent profiles, sessions, and skills |
