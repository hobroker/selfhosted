# `longhorn`

> Cloud-native distributed block storage for Kubernetes.

Source Code: https://github.com/longhorn/longhorn
Chart: https://charts.longhorn.io

## Prerequisites

These must be applied once per cluster before deploying.

**1. Bake Talos extensions via Image Factory** — Longhorn requires `iscsi-tools` and `util-linux-tools` baked into the installer image using [Talos Image Factory](https://factory.talos.dev):

```sh
curl -X POST https://factory.talos.dev/schematics \
  -H 'Content-Type: application/yaml' \
  --data-binary @- <<'EOF'
customization:
  systemExtensions:
    officialExtensions:
      - siderolabs/iscsi-tools
      - siderolabs/util-linux-tools
EOF
```

This returns a schematic ID. Set `machine.install.image` in `~/.talos/cluster/controlplane.yaml`:

```yaml
machine:
  install:
    image: factory.talos.dev/installer/<schematic-id>:<talos-version>
```

Then upgrade in-place (no data loss with `--preserve`):

```sh
talosctl upgrade \
  --image factory.talos.dev/installer/<schematic-id>:<talos-version> \
  --preserve
```

Verify extensions loaded after reboot: `talosctl get extensions`

**2. Configure kubelet extra mounts and sysctls** — required for Longhorn to manage storage on Talos:

```yaml
machine:
  kubelet:
    extraMounts:
      - destination: /var/lib/longhorn
        type: bind
        source: /var/lib/longhorn
        options:
          - bind
          - rshared
          - rw
  sysctls:
    vm.nr_hugepages: "1024"
```

Apply:

```sh
talosctl apply-config --file ~/.talos/cluster/controlplane.yaml
```

See [Talos Linux support docs](https://longhorn.io/docs/1.11.1/advanced-resources/os-distro-specific/talos-linux-support/) for full details.

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload — via ArgoCD UI or:
argocd app sync longhorn
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config
helm repo add longhorn https://charts.longhorn.io
helm repo update longhorn
helm upgrade --install longhorn longhorn/longhorn \
  --namespace longhorn-system --create-namespace \
  -f values.yaml
```

### Helm values

| chart      | values.yaml                                                        |
| ---------- | ------------------------------------------------------------------ |
| `longhorn` | https://github.com/longhorn/longhorn/blob/master/chart/values.yaml |

## Access

Longhorn UI is exposed via MetalLB at `192.168.50.204`.

## Backups

Backups are stored in GCS bucket `hobroker-selfhosted` under the `longhorn-backups/` prefix.

### Secrets

Add the following to Infisical under `/longhorn` before deploying:

| Name                    | Description                      |
| ----------------------- | -------------------------------- |
| `AWS_ACCESS_KEY_ID`     | GCS HMAC access key              |
| `AWS_SECRET_ACCESS_KEY` | GCS HMAC secret key              |
| `AWS_ENDPOINTS`         | `https://storage.googleapis.com` |

Generate HMAC keys: **GCP Console → Cloud Storage → Settings → Interoperability → Create a key for a service account** (requires Storage Object Admin on the bucket).

### Restoring on a new cluster

Once Longhorn is installed and pointed at the same backup target, it automatically discovers all existing backups. Restore a volume via **Longhorn UI → Backup → select → Restore**.
