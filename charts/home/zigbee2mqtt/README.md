About `zigbee2mqtt`
===

Installing/updating
---

```shell
helm upgrade --install zigbee2mqtt ./base/ --values zigbee2mqtt/values.yaml
```

### Assumptions
- folder `/appdata/k3s/zigbee2mqtt/data` will be mounted as `hostPath` to `/app/data`
- folder `/run/udev` will be mounted as `hostPath` to `/run/udev`
- folder `/dev/ttyUSB0` will be mounted as `hostPath` to `/dev/zigbee`
