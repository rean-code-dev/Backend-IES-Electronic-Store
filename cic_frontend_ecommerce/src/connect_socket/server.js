// server.js
const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

let connectionCount = 0;

wss.on('connection', (ws) => {
  console.log('Client connected.');
  connectionCount++;

  ws.send(JSON.stringify({ type: 'connectionStatus', status: 'connected', connectionCount }));

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === 'event') {
      // Broadcast the event
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'event',
            channel: parsedMessage.channel,
            event: parsedMessage.event,
            data: parsedMessage.data,
            timestamp: new Date().toLocaleTimeString()
          }));
        }
      });
    }
  });

  ws.on('close', () => {
    connectionCount--;
    console.log('Client disconnected.');
  });
});

server.listen(8081, () => console.log('WebSocket server listening on port 8081'));
