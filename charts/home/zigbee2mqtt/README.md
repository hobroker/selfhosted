# `zigbee2mqtt`

> A bridge software enabling Zigbee devices to communicate with MQTT servers for smart home integration.

Source Code: https://github.com/Koenkk/zigbee2mqtt

## Installing/upgrading

```shell
helmfile apply -f home/zigbee2mqtt/helmfile.yaml
```

### Host mounts

| hostPath                        | containerPath |
| ------------------------------- | ------------- |
| `/appdata/k3s/zigbee2mqtt/data` | `/app/data`   |
| `/run/udev`                     | `/run/udev`   |
| `/dev/ttyUSB0`                  | `/dev/zigbee` |
