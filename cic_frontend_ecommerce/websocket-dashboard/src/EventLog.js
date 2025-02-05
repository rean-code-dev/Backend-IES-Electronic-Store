import React from 'react';

const EventLog = ({ events }) => (
  <div>
    <h3>Events</h3>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Channel</th>
          <th>Event</th>
          <th>Data</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event, index) => (
          <tr key={index}>
            <td>{event.type}</td>
            <td>{event.channel}</td>
            <td>{event.event}</td>
            <td>{event.data}</td>
            <td>{event.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EventLog;
