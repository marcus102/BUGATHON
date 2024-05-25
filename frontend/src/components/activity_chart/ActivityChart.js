import React, { useRef } from 'react';
import classes from './ActivityChart.module.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const ActivityChart = () => {
  const createGradient = (ctx, area) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, area.bottom);
    gradient.addColorStop(0, '#00900064');
    gradient.addColorStop(1, '#0035000b');
    return gradient;
  };

  const data = {
    labels: ['1st day', '2nd day', '3rd day', '4th day', '5th day', '6th day', '7th day', '8th day', '9th day', '10th day', '11th day', '12th day'],
    datasets: [
      {
        label: 'Total Activity',
        data: [10, 15, 20, 30, 10, 30, 20, 25, 7, 5, 10, 20],
        fill: true,
        borderColor: '#049904ff',
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }
          return createGradient(ctx, chartArea);
        },
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default ActivityChart;
