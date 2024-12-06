// SenderPage.js
import React, { useState, useEffect } from 'react';

const SenderPage = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081');
    setSocket(ws);

    ws.onopen = () => {
      console.log('Connected to WebSocket server as sender.');
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server.');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      socket.send(message);
      setMessage(''); // Clear input after sending
    }
  };

  return (
    <div>
      <h2>Sender Page</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default SenderPage;
