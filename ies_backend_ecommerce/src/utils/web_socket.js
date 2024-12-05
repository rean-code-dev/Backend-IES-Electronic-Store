// Import required modules
const WebSocket = require('ws');
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running.\n');
});

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Set up WebSocket connection event listener
wss.on('connection', (ws) => {
  console.log('Client connected.');

  // Send a welcome message to the client
  ws.send('Welcome to the WebSocket server!');

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log(`Received from client: ${message}`);

    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Server broadcast: ${message}`);
      }
    });
  });

  // Handle WebSocket disconnection
  ws.on('close', () => {
    console.log('Client disconnected.');
  });
});

// Start the server on port 8080
app.listen(8081,()=>{  //define 8081 for application
    console.log("Server run http://localhost:8081")
})

