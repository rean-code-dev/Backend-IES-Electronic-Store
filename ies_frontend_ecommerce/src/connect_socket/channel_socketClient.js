import React, { useState, useEffect } from 'react';

const WebSocketChat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket('ws://localhost:8081');
    setSocket(ws);

    // Listen for messages from the server
    ws.onmessage = async (event) => {
      let messageText = event.data;

      // Check if the data is a Blob and convert it to text if so
      if (event.data instanceof Blob) {
        messageText = await event.data.text();
      }

      setMessages((prevMessages) => [...prevMessages, messageText]);
    };

    // Clean up on component unmount
    return () => {
      ws.close();
    };
  }, []);

  // Function to handle message submission
  const sendMessage = () => {
    if (socket && message) {
      socket.send(message);
      setMessage(''); // Clear the input field
    }
  };

  return (
    <div>
      <h2>WebSocket Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
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

export default WebSocketChat;
