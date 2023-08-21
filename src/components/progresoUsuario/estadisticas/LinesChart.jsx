import { Line } from 'react-chartjs-2';
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
    LineElement,
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
    LineElement,
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

            setHistorial(historialFiltrado.reverse());
            setStartDate(new Date(historialFiltrado[historialFiltrado.length - 1].date));
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    // Filtrar los datos basados en el rango de fechas seleccionado
    const filteredItems = items.filter(item => {
        if (startDate && endDate) {
            const itemDate = new Date(item.date);
            return itemDate >= startDate && itemDate <= endDate;
        }
        return true; // Si no se ha seleccionado un rango, mostrar todos los datos
    });

    const labels = filteredItems
    .filter(item => item.puntaje > 100) // Filtrar puntajes mayores a 100
    .map(item => item.date)
    .reverse();


    const puntaciones = filteredItems
    .filter(item => item.puntaje > 100 && item.puntaje < 1000) // Filtrar puntajes mayores a 100
    .map(item => item.puntaje)
    .reverse();

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Puntuación',
                data:  puntaciones,
                fill: true,
                borderColor: 'rgb(236, 180, 27)',
                pointRadius: 5,
                pointBorderColor: 'rgb(236, 180, 27)',
                pointBackgroundColor: 'rgb(236, 180, 27)',
            }
        ],
    };

    const options = {
        responsive : true,
        plugins:{
            legend : {
                display : false
            }
        },
        scales: {
            y: {
                min: 0,
                max: 1000
            },
            x: {}
        }
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
                    startDate={labels}
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


            {/* Gráfico de líneas */}
            <div className='containerGrafich'>
                <Line data={data} options={options} className='grafico' />  
            </div>
            
        </div>
    );
}
