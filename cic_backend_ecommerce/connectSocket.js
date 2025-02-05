// // Import required modules
// const WebSocket = require('ws');
// const http = require('http');

// // Create an HTTP server
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('WebSocket server is running.\n');
// });

// // Create a WebSocket server
// const wss = new WebSocket.Server({ server });

// // Set up WebSocket connection event listener
// wss.on('connection', (ws) => {
//   console.log('Client connected.');

//   // Send a welcome message to the client
//   ws.send('Welcome to the WebSocket server!');

//   // Listen for messages from the client
//   ws.on('message', (message) => {
//     console.log(`Received from client: ${message}`);

//     // Broadcast message to all connected clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(`Server broadcast: ${message}`);
//       }
//     });
//   });

//   // Handle WebSocket disconnection
//   ws.on('close', () => {
//     console.log('Client disconnected.');
//   });
// });

// // Start the server on port 8080
// server.listen(8081, () => {
//   console.log('WebSocket server is listening on port 8081');
// });


// // const WebSocket = require('ws');
// // const server = new WebSocket.Server({ port: 8081 });

// // // Handle new connections
// // server.on('connection', (ws) => {
// //   console.log('New client connected');

// //   // Listen for messages from clients
// //   ws.on('message', (message) => {
// //     console.log(`Received message: ${message}`);
    
// //     // Broadcast the message to all connected clients
// //     server.clients.forEach((client) => {
// //       if (client.readyState === WebSocket.OPEN) {
// //         client.send(message);
// //       }
// //     });
// //   });

// //   // Handle client disconnection
// //   ws.on('close', () => {
// //     console.log('Client disconnected');
// //   });
// // });

// // console.log('WebSocket server is listening on ws://localhost:8080');
