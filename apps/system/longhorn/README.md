# `longhorn`

> Cloud-native distributed block storage for Kubernetes.

Source Code: https://github.com/longhorn/longhorn
Chart: https://charts.longhorn.io

## Prerequisites

These must be applied once per cluster before deploying.

**1. Install Talos extensions** — Longhorn requires `iscsi-tools` and `util-linux-tools`. Add to `controlplane.yaml`:

```yaml
machine:
  install:
    extensions:
      - image: ghcr.io/siderolabs/iscsi-tools:v0.1.6
      - image: ghcr.io/siderolabs/util-linux-tools:2.40.2
```

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

Apply and reboot:

```sh
talosctl apply-config --file ~/.talos/cluster/controlplane.yaml --reboot
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
kubectl apply -f config/namespace.yaml
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
