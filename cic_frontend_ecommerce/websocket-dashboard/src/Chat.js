import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ eventLog }) => {
  const timestamps = eventLog.map(event => event.timestamp);
  const values = eventLog.map((_, index) => index + 1);

  const data = {
    labels: timestamps,
    datasets: [{
      label: 'Events Over Time',
      data: values,
      fill: false,
      borderColor: 'blue'
    }]
  };

  return <Line data={data} />;
};

export default Chart;
