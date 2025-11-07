const ip = require('ip');
const WebSocket = require('ws');

const port = 8080;
const wss = new WebSocket.Server({ port });

const clients = {};

wss.on('error', function error(err) {
  console.log('Error: ' + err.code);
});

wss.on('connection', function connection(ws, req) {
  console.log('connected');

  let clientID = req.headers['sec-websocket-key'];
  clients[clientID] = ws;

  ws.on('error', function (err) {
    console.log('Found error: ' + err);
  });

  ws.on('message', function incoming(message) {
    const decodedMessage = message.toString();
    console.log('received:', decodedMessage, 'from', clientID, Object.keys(clients));

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`${decodedMessage}`);
      }
    });

    if (decodedMessage === 'Hello WebSocket!') {
      console.log('received Hello WebSocket!');
    } else if (decodedMessage === 'RESET_CELESTIA') {
      console.log('received RESET_CELESTIA');
    }
  });

  ws.on('close', function () {
    console.log(new Date() + ' Peer ' + clientID + ' disconnected.');
    delete clients[clientID];
  });
});

console.log(ip.address() + ' listening on port ', port);