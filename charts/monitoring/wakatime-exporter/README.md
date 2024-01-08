About `wakatime-exporter`
===
Docs: https://github.com/MacroPower/wakatime_exporter

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
>      name: wakatime-exporter-secrets
>      namespace: self
>    type: Opaque
>    stringData:
>      WAKA_API_KEY: "api_key"
>    ```
>
> </details>

```shell
helm upgrade --install wakatime-exporter bjw-s/app-template -f monitoring/wakatime-exporter/values.yaml
```
