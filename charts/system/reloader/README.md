# `reloader`

> K8s controller to that does rolling upgrades on ConfigMap/Secrets changes

Source Code: https://github.com/stakater/Reloader
Chart: https://github.com/stakater/Reloader/tree/master/deployments/kubernetes/chart/reloader

## Installing/upgrading

```shell
helmfile apply
```

### Helm values

| chart      | values.yaml                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------- |
| `reloader` | https://github.com/stakater/Reloader/blob/master/deployments/kubernetes/chart/reloader/values.yaml |
