import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';
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

const mesesDelAño = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];

const beneficiosNumericosPorMes = [
    31, // Enero - Días en el mes
    28, // Febrero - Días en el mes en años no bisiestos
    43, // Marzo - Días en el mes
    30, // Abril - Días en el mes
    12, // Mayo - Días en el mes
    30, // Junio - Días en el mes
    44, // Julio - Días en el mes
    36, // Agosto - Días en el mes
    30, // Septiembre - Días en el mes
    43, // Octubre - Días en el mes
    30, // Noviembre - Días en el mes
    31  // Diciembre - Días en el mes
];

const ApiEssayLast5 = Apiurl +'recent_essay_resume/'

export default function LinesChart() {
    const [items, setHistorial] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem("token");
    const [essayInfo, setEssayInfo] = useState([]);

   
    
    useEffect(() => {
        axios.get(ApiEssayLast5 + user_id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
         
            const data = Object.values(res.data);
            setEssayInfo(data)
            console.log(essayInfo)
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const labels = essayInfo
    .filter(item => item.puntaje >= 100) // Filtrar puntajes mayores a 100
    .map(item => item.date)
    .reverse();


    const puntaciones = essayInfo
    .filter(item => item.puntaje >= 100 && item.puntaje <= 1000) // Filtrar puntajes mayores a 100
    .map(item => item.puntaje)
    .reverse();
    

    const mydata ={
        labels: labels,
        datasets: [
            {
                label: 'puntajes',
                data: puntaciones,
                tension: 0.5,
                pointRadius: 5,
                fill: true,
                borderColor: 'rgb(236, 180, 27)',
                pointBorderColor: 'rgb(236, 180, 27)',
                pointBackgroundColor: 'rgb(236, 180, 27)',
            },
        ]
    
    };

    const myoptions = {
        plugins:{
            legend:{
                display:true
            }
        }
    };


    

            
    return <Line data={mydata} options={myoptions}  />
   
   
}
