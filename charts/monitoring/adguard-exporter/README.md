About `adguard-exporter`
===
| Docs                 | URL                                                    |
|----------------------|--------------------------------------------------------|
| `bjw-s/app-template` | https://bjw-s.github.io/helm-charts/docs/app-template/ |
| `adguard-exporter`   | https://hub.docker.com/r/ebrianne/adguard-exporter     |

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
helm upgrade --install adguard-exporter bjw-s/app-template -f monitoring/adguard-exporter/values.yaml
```
