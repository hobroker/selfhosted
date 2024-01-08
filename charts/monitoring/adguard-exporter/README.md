About `adguard-exporter`
===
Docs: https://hub.docker.com/r/ebrianne/adguard-exporter

Installing/updating
===

---

> <details>
>   <summary>Secrets</summary>
>
>    ```yaml
>    apiVersion: v1
>    kind: Secret
>    metadata:
>      name: adguard-exporter-secrets
>    type: Opaque
>    stringData:
>      adguard_username: "username"
>      adguard_password: "password"
>      adguard_hostname: "hostname"
>    ```
>
> </details>

```shell
helm upgrade --install adguard-exporter ./base/ --values monitoring/adguard-exporter.yaml
```
