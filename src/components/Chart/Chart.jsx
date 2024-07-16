import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Chart({ transactions }) {
  const data = {
    labels: transactions.map(transaction => transaction.date),
    datasets: [{
      data: transactions.map(transaction => transaction.amount),
      backgroundColor: 'transparent',
      borderColor: '#FFD700',
      pointBorderColor: 'red',
      pointBorderWidth: 4,
      tension: 1
    }]
  };

  const options = {
    plugins: {
      legend: false
    },
    scales: {
      y: {
        min: 200,
        max: 2800,
        ticks: {
          stepSize: 200,
        }
      }
    }
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-10'>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
