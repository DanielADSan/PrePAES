import React from 'react'
import { Pie } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import axios from 'axios';
import { Apiurl } from '../../../Services/apirest';
ChartJS.register(ArcElement, Tooltip, Legend);
export default function PiesChart ({dataPercentage}) {
var options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
          display: true, // Ocultar la leyenda si no se necesita
           
            labels: {
              boxWidth: 20, // Ancho de cada elemento de la leyenda
              
              padding: 10, // Espaciado entre elementos de la leyenda
              usePointStyle: true, // Usar forma de punto en vez de cuadrado
            },

        },
      
        tooltip: {
          callbacks: {
            label: function (context) {
              var label = context.label || '';
              var value = context.parsed || 0;
  
              // Formatear el valor con el signo de porcentaje
              label += ': ' + value + '%';
              return label;
            },
          },
        },
      },
}    

var data = {
    labels: ['Correctas','Incorrectas'],
    datasets: [
        {
            label: 'Porcentaje de acierto',
            data: [dataPercentage.Correcta, dataPercentage.Incorrecta],
            
            backgroundColor: [
                'rgb(124,252,0, 0.2)', 
                'rgba(255, 99, 132, 0.2)',
                             
            ],
            borderColor: [
                'rgba(124,252,0, 1)', 
                'rgba(255, 99, 132, 1)',               
                               
            ],
            borderWidth: 1,
        },
    ],
};


    return <Pie data={data} options={options} />
}
