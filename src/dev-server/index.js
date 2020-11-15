const fs = require('fs');
const path = require('path');
const http = require('http');

const port = process.env.PORT || 8000;

console.log(`starting sever on port ${port}\n\tor http://localhost:${port}`);

http.createServer((req, res) => {
  fs.readFile(path.resolve(__dirname, '../..', req.url.substr(1)), (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(port);
