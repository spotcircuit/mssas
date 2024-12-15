import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = {
  positive: 'rgb(34, 197, 94)',
  negative: 'rgb(239, 68, 68)',
  neutral: 'rgb(156, 163, 175)',
  booking: 'rgb(59, 130, 246)',
  pricing: 'rgb(236, 72, 153)',
  treatment: 'rgb(168, 85, 247)',
  aftercare: 'rgb(234, 179, 8)',
  staff: 'rgb(14, 165, 233)',
  facility: 'rgb(45, 212, 191)'
};

function PieChart({ data, title }) {
  const chartData = {
    labels: Object.keys(data).map(key => key.charAt(0).toUpperCase() + key.slice(1)),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: Object.keys(data).map(key => COLORS[key] || '#CBD5E1'),
        borderWidth: 1
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-64">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}

export default PieChart;