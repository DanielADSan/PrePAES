import { useState, useEffect } from 'react' /*por defecto, useEffect rederiza todo lo dentro al cargar la pagina*/
import LinesChart from './lineChart';
import { Apiurl } from '../../../Services/apirest';
import axios from 'axios';
const user_id = localStorage.getItem('user_id');
const ApiEssayLast5 = Apiurl + 'recent_essay_resume/' + user_id + '/';
const ApiEssayMostRecent = Apiurl + 'recent_essay/' + user_id + '/';
const ApiEssayBestScore = Apiurl + 'best_average_score/' + user_id + '/';

const Statistics = () => {

    useEffect(() => {
        // Esta función se ejecutará después de que el componente se haya montado en el DOM.
        EssayData();
        EssayAverageBestData();
        FiveEssayData();
    }, []);
    const [essayScoreRecent, setEssayScoreRecent] = useState(0);
    const [essayAverageScore, setEssayAverageScore] = useState(0);
    const [essayScoreBest, setEssayScoreBest] = useState(0);
    const [five_essay_ul , setFive_essay_ul] = useState([]);
    async function EssayData() {
        const token = localStorage.getItem("token");

        const essayMostRecentData = await axios.get(ApiEssayMostRecent, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

   
   
        //dos decimales solo si es que tiene decimales = toFixed(2) como no agregar los decimales si es un numero entero = 
            
            setEssayScoreRecent(essayMostRecentData.data.puntaje.toFixed(0))
   
      

    }

    async function EssayAverageBestData() {
        const token = localStorage.getItem("token");

        const essayMostRecentData = await axios.get(ApiEssayBestScore, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setEssayAverageScore(essayMostRecentData.data.average.toFixed(0)) 
        setEssayScoreBest(essayMostRecentData.data.bestScore.puntaje.toFixed(0))

    }

    async function FiveEssayData() {
        const token = localStorage.getItem("token");

        const essayFiveRecentData = await axios.get(ApiEssayLast5, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setFive_essay_ul(essayFiveRecentData.data)
        console.log(five_essay_ul)

    }

    return (
        <>
            <div className='containerDashboard'>
                <ul className='insights'>
                    <li>
                        <i class='resumen bx bx-calendar-check'></i>
                        <span className='info'>         
                            <h3>{essayScoreRecent}</h3>
                            <p href="username">Ensayo más reciente</p>                    
                        </span>
                    </li>
                    <li>
                        <i class='resumen bx bx-globe'></i>
                        <span className='info'>
                            

                            <h3>{essayAverageScore}</h3>
                            <p href="username">Promedio de puntajes</p>
                        </span>
                    </li>
                    <li>
                    <i class='resumen bx bxs-arrow-to-top' ></i>
                        <span className='info'>
                            <h3>{essayScoreBest}</h3>
                            <p href="username">Puntaje máximo</p>

                        </span>
                    </li>
                </ul>
                <div className='bottom-data'>
                    <div className='orders'>
                        <div className='header'>
                            <i class='bx bx-stats'></i>
                            <h3>Evolución de puntaje</h3>
                            <i class='bx bx-filter'></i>
                  
                        </div>
                        <div className='containerGraphicData'>
                            <div className='graphicData'>
                                <LinesChart />
                            </div>
                        </div>
                        
                    </div>
                    <div class="orders">
                    <div class="header">
                    <i class='bx bx-history' ></i>
                        <h3>Ultimos ensayos</h3>
                        <i class='bx bx-filter'></i>
            
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre ensayo</th>
                                <th>Fecha</th>
                                <th>Puntaje</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            {five_essay_ul.length !== 0 &&  five_essay_ul.map((ensayo, index) => (
                                <tr key={index}>
                                    <td><p>{ensayo.name}</p></td>
                                    <td>{ensayo.date}</td>
                                    <td>{ensayo.puntaje}</td>
                                </tr>
                            ))}    
                        </tbody>
                    </table>
                </div>
                </div>
            
                
            </div>

        </>
    )
}

export default Statistics;
