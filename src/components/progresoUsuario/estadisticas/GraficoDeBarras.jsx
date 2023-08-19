import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../styles/statistics.css';
import { Apiurl } from '../../../Services/apirest';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
//import { max } from 'moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function LinesChart() {
    const [items, setHistorial] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(Apiurl + "history/" + user_id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            const historialArray = Object.values(res.data);
            console.log(historialArray);
            const historialFiltrado = historialArray.filter((dato) =>dato != null);
            console.log(historialFiltrado)
            setHistorial(historialFiltrado.reverse());
            setStartDate(new Date(historialFiltrado[historialFiltrado.length - 1].date));
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    // Filtrar los datos basados en el rango de fechas seleccionado


  

   // Filtrar los nombres que coinciden con las categorías y obtener sus puntuaciones
   const matchingNames = [...new Set(items
    .filter(item => {
        const name = item.name.toLowerCase();
        return name.includes("números") || name.includes("álgebra") || name.includes("geometría") || name.includes("probabilidad");
    })
    .map(item => item.name))];



    const matchingScores = items
    .filter(item => matchingNames.includes(item.name))
    .map(item => item.puntaje);
    

    const categoryAverages = matchingNames.map(category => {
        const categoryItems = items.filter(item => item.name === category);
        const categoryScores = categoryItems.map(item => item.puntaje);
        const filteredScores = categoryScores.filter(score => score > 100 && score <= 1000); // Filtrar puntajes mayores a 100 y menores o iguales a 1000
        const sum = filteredScores.reduce((total, score) => total + score, 0);
        const average = sum / filteredScores.length;
        return average;
    });
    const colors = ['RGBA(236, 180, 27, 0.5)', 'RGBA(255, 0, 0, 0.5)', 'RGBA(0, 255, 0, 0.5)', 'RGBA(0, 0, 255, 0.5)']; // Array de colores
    const colorFuerte = ['rgb(236, 180, 27)', 'rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'];
    console.log(categoryAverages)
    console.log(matchingNames)
      const data = {
        labels: matchingNames,
        datasets: [
          {
            label: 'Promedio',
            data: categoryAverages,
            backgroundColor: colors.slice(0, matchingNames.length), // Asignar colores diferentes a cada categoría
            borderColor: colorFuerte.slice(0, matchingNames.length),
            borderWidth: 1,
          },
          
        ],
      };
      
      console.log(data)
      const options = {
        responsive : true,
        plugins:{
            legend : {
                display : false
            }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 100,
            },
          },
        },
      };

     // Obtener la fecha actual y la fecha anterior
     const currentDate = new Date();
     const previousDate = new Date();
     previousDate.setDate(previousDate.getDate() - 1);
 
     // Funciones de manejo de eventos para capturar el rango de fechas seleccionado
     const handleStartDateChange = (date) => {
         setStartDate(date);
     };
 
     const handleEndDateChange = (date) => {
         setEndDate(date);
     };

     return (
        <div>
            {  
            
            <div className='calendario'>
                <div className='date-picker'>
                    <p>Fecha inicial</p>
                    <DatePicker
                    className='custom-datepicker'
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={matchingNames}
                    endDate={endDate}
                    dateFormat="yyyy/MM/dd"
                    />
                </div>
                <div className='date-picker'>
                    <p>Fecha final</p>
                    <DatePicker
                    className='custom-datepicker'
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="yyyy/MM/dd"
                    />
                    
                </div>  
                </div>
            }


            
            <div className='containerGrafich'>
                <Bar data={data} options={options} className='grafico' />  
            </div>
            
        </div>
    );
}
