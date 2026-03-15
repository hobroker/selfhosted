# `adguardhome`

> A network-wide DNS ad blocker and privacy filter

Source Code: https://github.com/AdguardTeam/AdGuardHome
Chart: https://bjw-s-labs.github.io/helm-charts/docs/app-template/

## Installing/upgrading

```sh
# Register / update the Application resource
kubectl apply -f application.yaml

# Then sync the workload - via ArgoCD UI or:
argocd app sync adguardhome
```

### Manual Helm (without ArgoCD)

```sh
kubectl apply -f config/pv.yaml
helm repo add bjw-s https://bjw-s-labs.github.io/helm-charts
helm repo update bjw-s
helm upgrade --install adguardhome bjw-s/app-template \
  --namespace default --create-namespace \
  -f values.yaml
```

## Storage

| source                                   | containerPath           | description         |
| ---------------------------------------- | ----------------------- | ------------------- |
| `/var/local/adguardhome/work` (hostPath) | `/opt/adguardhome/work` | Working data        |
| `/var/local/adguardhome/conf` (hostPath) | `/opt/adguardhome/conf` | Configuration files |

PV: `adguardhome-work-pv` → PVC: `adguardhome-work-pvc`
PV: `adguardhome-conf-pv` → PVC: `adguardhome-conf-pvc`
