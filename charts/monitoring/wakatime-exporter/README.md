# `wakatime-exporter`

> Exports Prometheus metrics from Wakatime.

Source Code: https://github.com/MacroPower/wakatime_exporter

# Installing/upgrading

---

> <details>
>   <summary>Secrets</summary>
>
> ```yaml
> apiVersion: v1
> kind: Secret
> metadata:
>   name: wakatime-exporter-secrets
>   namespace: self
> type: Opaque
> stringData:
>   WAKA_API_KEY: "api_key"
> ```
>
> </details>

```shell
helmfile apply
```
