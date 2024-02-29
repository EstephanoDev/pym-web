'use client'

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const BarChart = ({ week }: any) => {
  // Obtener los datos de las semanas y la suma del trabajo
  const labels = week.map((item: { Semana: string }) => item.Semana);
  const dataValues = week.map((item: { SumaDelTrabajo: number }) => item.SumaDelTrabajo);
  const tipoTrabajo = week[0].TipoTrabajo; // Tomar el tipo de trabajo de cualquier elemento en la semana

  // Generar un color aleatorio para el gráfico
  const backgroundColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, 0.2)`;

  // Definir los datos del gráfico
  const data = {
    labels: labels,
    datasets: [{
      label: tipoTrabajo, // Mostrar el tipo de trabajo en la leyenda
      data: dataValues,
      backgroundColor: backgroundColor,
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  // Renderizar el gráfico utilizando los datos
  return (
    <div>
      <h2>Gráfico de Barras - {tipoTrabajo}</h2>
      <Bar data={data} />
    </div>
  );
}

export default BarChart;
