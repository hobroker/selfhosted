About `exporters`
===
> | Image               | Repository                                         |
> |---------------------|----------------------------------------------------|
> | `wakatime-exporter` | https://github.com/MacroPower/wakatime_exporter    |
> | `adguard-exporter`  | https://hub.docker.com/r/ebrianne/adguard-exporter |

Installing/updating
===

`wakatime-exporter`
---
<details>
  <summary><b>Secrets</b></summary>

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: adguard-exporter-secrets
   type: Opaque
   stringData:
     adguard_username: "username"
     adguard_password: "password"
     adguard_hostname: "hostname"
   ```

</details>

```shell
helm upgrade --install wakatime-exporter ./base/ --values ./exporters/wakatime-exporter.yaml
```

`adguard-exporter`
---

<details>
  <summary><b>Secrets</b></summary>

   ```yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: wakatime-exporter-secrets
     namespace: self
   type: Opaque
   stringData:
     WAKA_API_KEY: "api_key"
   ```

</details>

```shell
helm upgrade --install adguard-exporter ./base/ --values ./exporters/adguard-exporter.yaml
```

Helm values
===

| chart  | values.yaml                                                                |
|--------|----------------------------------------------------------------------------|
| `base` | https://github.com/hobroker/selfhosted/blob/master/charts/base/values.yaml |
