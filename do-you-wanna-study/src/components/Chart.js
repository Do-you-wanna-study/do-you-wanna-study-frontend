import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    title: {

      display: false,
    },
  },
};

const labels = ['총점', '실력', '인성', '성실', '도움'];

function Chart(props) {
  
  const data = {
    labels,
    datasets: [
      {
        label: '5점 만점',
        data: [props.grade.total,props.grade.skill,props.grade.kindness,props.grade.sincerity,props.grade.helpful],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  return (
  <Bar options={options} data={data} />
  )
}

export default Chart;
