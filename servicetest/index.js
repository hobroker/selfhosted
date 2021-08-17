const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const pick = keys => object => keys.reduce((acc, key) => ({
  ...acc,
  [key]: object[key],
}), {});

let localIP = null;

require('dns').lookup(require('os').hostname(), (err, add, fam) => {
  localIP = add;
});

const rootRoute = async (req, res) => {
  const reqIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const { url } = req.query;
  let error = null;
  let result = null;
  if (url) {
    try {
      result = await axios.get(url).then(pick([ 'status', 'statusText' ]));
    } catch (e) {
      error = e;
    }
  }

  const response = {
    data: {
      localIP,
      reqIp,
      url,
      error,
      result,
    },
  };

  console.log('response', response);

  res.send(response);
};

app.get('/', rootRoute)
  .listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });
