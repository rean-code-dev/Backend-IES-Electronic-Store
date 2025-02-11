import React, { useState, useEffect } from 'react';
import Chart from './Chat';
import EventLog from './EventLog';


const Dashboard = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [eventLog, setEventLog] = useState([]);
  const [channel, setChannel] = useState('');
  const [event, setEvent] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081');
    setSocket(ws);
  
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
  
    ws.onmessage = (message) => {
      const parsedData = JSON.parse(message.data);
      if (parsedData.type === 'event') {
        setEventLog((prevLog) => [...prevLog, parsedData]);
      }
    };
  
    return () => ws.close();
  }, []);
  
  
  

  const sendEvent = () => {
    if (socket && connected) {
      const message = JSON.stringify({
        type: 'event',
        channel,
        event,
        data
      });
      socket.send(message);
      setChannel('');
      setEvent('');
      setData('');
    }
  };

  return (
    <div>
      <h2>WebSocket Dashboard</h2>
      <button onClick={() => socket.close()}>{connected ? 'Disconnect' : 'Disconnected'}</button>
      <div>
        <h3>Realtime Statistics</h3>
        <Chart eventLog={eventLog} />
      </div>
      <div>
        <h3>Event Creator</h3>
        <input value={channel} onChange={(e) => setChannel(e.target.value)} placeholder="Channel" />
        <input value={event} onChange={(e) => setEvent(e.target.value)} placeholder="Event" />
        <input value={data} onChange={(e) => setData(e.target.value)} placeholder="Data" />
        <button onClick={sendEvent}>Send Event</button>
      </div>
      <EventLog events={eventLog} />
    </div>
  );
};
export default Dashboard;
