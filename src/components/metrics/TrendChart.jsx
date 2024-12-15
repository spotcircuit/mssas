import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TrendChart({ data = [], title, type = 'sentiment' }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-gray-500 mt-2">No trend data available</p>
      </div>
    );
  }

  const chartData = {
    labels: data.map(item => item.period),
    datasets: type === 'sentiment' ? [
      {
        label: 'Positive %',
        data: data.map(item => item.positivePercentage?.toFixed(1)),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.1
      },
      {
        label: 'Negative %',
        data: data.map(item => item.negativePercentage?.toFixed(1)),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.1
      }
    ] : [
      {
        label: 'Review Count',
        data: data.map(item => item.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: title
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => type === 'sentiment' ? `${value}%` : value
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default TrendChart;