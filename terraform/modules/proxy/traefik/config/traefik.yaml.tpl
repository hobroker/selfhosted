api:
  dashboard: true
  debug: true
  insecure: true

pilot:
  token: "${pilot_token}"

providers:
  docker:
    defaultRule: "Host(`{{ index .Labels \"subdomain\" }}.${hostname}`)"
    endpoint: "unix:///var/run/docker.sock"
    swarmMode: true
