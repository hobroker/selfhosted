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
    useBindPortIP: true
    network: ${network}
    exposedByDefault: false
#    tls:
#      insecureSkipVerify: true

#entryPoints:
#  http:
#    address: ':80'
##    redirect:
##      entryPoint: https
#  https:
#    address: ':443'
#
#tls:
#  stores:
#    default:
#      defaultCertificate:
#        certFile: /certs/fullchain.pem
#        keyFile: /certs/privkey.pem
