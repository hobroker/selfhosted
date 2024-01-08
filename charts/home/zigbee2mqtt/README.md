About `zigbee2mqtt`
===

Installing/updating
---

```shell
helm upgrade --install zigbee2mqtt ./base/ -f zigbee2mqtt/values.yaml
```

### Host mounts

| hostPath                        | containerPath |
|---------------------------------|---------------|
| `/appdata/k3s/zigbee2mqtt/data` | `/app/data`   |
| `/run/udev`                     | `/run/udev`   |
| `/dev/ttyUSB0`                  | `/dev/zigbee` |
