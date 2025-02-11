// ReceiverPage.js
import React, { useState, useEffect } from 'react';

const ReceiverPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081');

    ws.onopen = () => {
      console.log('Connected to WebSocket server as receiver.');
    };

    ws.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server.');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Receiver Page</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default ReceiverPage;
