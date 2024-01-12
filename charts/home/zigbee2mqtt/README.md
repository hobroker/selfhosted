About `zigbee2mqtt`
===

Installing/upgrading
---

```shell
helmfile apply -f home/zigbee2mqtt/helmfile.yaml
```

### Host mounts

| hostPath                        | containerPath |
|---------------------------------|---------------|
| `/appdata/k3s/zigbee2mqtt/data` | `/app/data`   |
| `/run/udev`                     | `/run/udev`   |
| `/dev/ttyUSB0`                  | `/dev/zigbee` |
