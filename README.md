Selfhosted ![version](https://img.shields.io/github/package-json/v/hobroker/selfhosted)
===

Personal selfhosted services (like dotenv but for docker).

Stacks
---


<table>
  <thead>
    <tr>
      <th>N</th>
      <th>Stack</th>
      <th>Service name</th>
      <th>URL</th>
    </tr>
  </thead>
    <tbody>
      <tr>
    <td>1</td>
    <td rowspan=2>chief</td>
    <td>adguard</td>
    <td><a href="https://hub.docker.com/r/adguard/adguardhome">adguard/adguardhome</a></td>
  </tr>
  <tr>
    <td>2</td>
    <td>pomerium</td>
    <td><a href="https://hub.docker.com/r/pomerium/pomerium">pomerium/pomerium</a></td>
  </tr>
<tr>
    <td>3</td>
    <td rowspan=2>debug</td>
    <td>code-server</td>
    <td><a href="https://hub.docker.com/r/linuxserver/code-server">linuxserver/code-server</a></td>
  </tr>
  <tr>
    <td>4</td>
    <td>dozzle</td>
    <td><a href="https://hub.docker.com/r/amir20/dozzle">amir20/dozzle</a></td>
  </tr>
<tr>
    <td>5</td>
    <td rowspan=2>discovery</td>
    <td>radarr</td>
    <td><a href="https://hub.docker.com/r/linuxserver/radarr">linuxserver/radarr</a></td>
  </tr>
  <tr>
    <td>6</td>
    <td>sonarr</td>
    <td><a href="https://hub.docker.com/r/linuxserver/sonarr">linuxserver/sonarr</a></td>
  </tr>
<tr>
    <td>7</td>
    <td rowspan=5>faas</td>
    <td>basic-auth-plugin</td>
    <td><a href="https://hub.docker.com/r/openfaas/basic-auth-plugin">openfaas/basic-auth-plugin</a></td>
  </tr>
  <tr>
    <td>8</td>
    <td>faas-swarm</td>
    <td><a href="https://hub.docker.com/r/openfaas/faas-swarm">openfaas/faas-swarm</a></td>
  </tr>
    <tr>
    <td>9</td>
    <td>gateway</td>
    <td><a href="https://hub.docker.com/r/openfaas/gateway">openfaas/gateway</a></td>
  </tr>
    <tr>
    <td>10</td>
    <td>nats</td>
    <td><a href="https://hub.docker.com/r/nats-streaming">nats-streaming</a></td>
  </tr>
    <tr>
    <td>11</td>
    <td>queue-worker</td>
    <td><a href="https://hub.docker.com/r/openfaas/queue-worker">openfaas/queue-worker</a></td>
  </tr>
<tr>
    <td>12</td>
    <td rowspan=3>monitor</td>
    <td>alertmanager</td>
    <td><a href="https://hub.docker.com/r/prom/alertmanager">prom/alertmanager</a></td>
  </tr>
  <tr>
    <td>13</td>
    <td>grafana</td>
    <td><a href="https://hub.docker.com/r/grafana/grafana">grafana/grafana</a></td>
  </tr>
    <tr>
    <td>14</td>
    <td>prometheus</td>
    <td><a href="https://hub.docker.com/r/prom/prometheus">prom/prometheus</a></td>
  </tr>
<tr>
    <td>15</td>
    <td rowspan=4>plex</td>
    <td>app</td>
    <td><a href="https://hub.docker.com/r/linuxserver/plex">linuxserver/plex</a></td>
  </tr>
  <tr>
    <td>16</td>
    <td>ombi</td>
    <td><a href="https://hub.docker.com/r/linuxserver/ombi">linuxserver/ombi</a></td>
  </tr>
    <tr>
    <td>17</td>
    <td>tautulli</td>
    <td><a href="https://hub.docker.com/r/tautulli/tautulli">tautulli/tautulli</a></td>
  </tr>
    <tr>
    <td>18</td>
    <td>xteve</td>
    <td><a href="https://hub.docker.com/r/tnwhitwell/xteve">tnwhitwell/xteve</a></td>
  </tr>
<tr>
    <td>19</td>
    <td rowspan=4>swarmpit</td>
    <td>agent</td>
    <td><a href="https://hub.docker.com/r/swarmpit/agent">swarmpit/agent</a></td>
  </tr>
  <tr>
    <td>20</td>
    <td>app</td>
    <td><a href="https://hub.docker.com/r/swarmpit/swarmpit">swarmpit/swarmpit</a></td>
  </tr>
    <tr>
    <td>21</td>
    <td>db</td>
    <td><a href="https://hub.docker.com/r/couchdb">couchdb</a></td>
  </tr>
    <tr>
    <td>22</td>
    <td>influxdb</td>
    <td><a href="https://hub.docker.com/r/influxdb">influxdb</a></td>
  </tr>
<tr>
    <td>23</td>
    <td rowspan=2>torrent</td>
    <td>qbittorrent</td>
    <td><a href="https://hub.docker.com/r/linuxserver/qbittorrent">linuxserver/qbittorrent</a></td>
  </tr>
  <tr>
    <td>24</td>
    <td>jackett</td>
    <td><a href="https://hub.docker.com/r/linuxserver/jackett">linuxserver/jackett</a></td>
  </tr>
    </tbody>
</table>

---

References
---
 - [Compose file version 3 reference](https://docs.docker.com/compose/compose-file/)
 - [`docker stack` command](https://docs.docker.com/engine/reference/commandline/stack/)
