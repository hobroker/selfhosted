# `vault`

> A tool for secrets management, encryption as a service, and privileged access management

Source Code: https://github.com/hashicorp/vault
Chart: https://github.com/hashicorp/vault-helm

## Installing/upgrading

```shell
helmfile apply
```

## Console

```shell
kubectl exec --stdin=true --tty=true vault-0 -n vault -- /bin/sh
```