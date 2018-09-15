const http = require('http');
const express = require('express');
const terminus = require('@godaddy/terminus');
const cors = require('cors');
const echoing = require('./middlewares/echoing');

const app = express();
app.use(cors());
app.use(echoing());

app.get('/', (req, res) => res.send());

const server = http.createServer(app);
terminus(server, {
  logger: console.log,
  signal: 'SIGINT'
});

const PORT = process.env['PORT'] || 8000;
server.listen(PORT, function () {
  console.log(`Web server listening on port ${PORT}`)
});
