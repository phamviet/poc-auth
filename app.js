const http = require('http');
const express = require('express');
const terminus = require('@godaddy/terminus');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  // debug
  console.log(JSON.stringify(req.headers));
  const xForwardedUri = req.get('X-Forwarded-Uri');
  const xAllowedRepos = req.get('X-Allowed-Repos');
  let statusCode = 401;

  // Simulating authenticated user
  if (req.get('Proxy-Authorization')) {
    // todo auth against LDAP
    statusCode = 200;

    /* Check git repository*/
  } else if (xForwardedUri && xForwardedUri.indexOf('git-receive-pack') !== -1 && xAllowedRepos) {
    const params = xForwardedUri.split(/\/(.*)\/(.*)\.git\//).filter(Boolean);
    const allowedRepos = xAllowedRepos.trim().split(/[ ,]+/);
    const user = params[0];
    const name = params[1];
    if (allowedRepos.indexOf(name) !== -1) {
      statusCode = 200;
    }
  }

  // Unauthenticated
  res.sendStatus(statusCode);

});

const server = http.createServer(app);
terminus(server, {
  logger: console.log,
  signal: 'SIGINT'
});

const PORT = process.env['PORT'] || 8000;
server.listen(PORT, function () {
  console.log(`Web server listening on port ${PORT}`)
});
