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

    async function EssayData() {
        const token = localStorage.getItem("token");

        const essayMostRecentData = await axios.get(ApiEssayMostRecent, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

       
        const essayScoreRecent = document.getElementById("essayScoreRecent");
   

       
        essayScoreRecent.textContent = essayMostRecentData.data.puntaje
      

    }

    async function EssayAverageBestData() {
        const token = localStorage.getItem("token");

        const essayMostRecentData = await axios.get(ApiEssayBestScore, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const essayAverageScore = document.getElementById("essayAverageScore");

       
        const essayScoreBest = document.getElementById("essayScoreBest");
       
        essayAverageScore.textContent = essayMostRecentData.data.average
 
        essayScoreBest.textContent = essayMostRecentData.data.bestScore.puntaje
     

    }

    async function FiveEssayData() {
        const token = localStorage.getItem("token");

        const essayFiveRecentData = await axios.get(ApiEssayLast5, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const five_essay_ul = document.getElementById('five_essay_ul');
        console.log(essayFiveRecentData)

        five_essay_ul.innerHTML = ''

        essayFiveRecentData.data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name + ' ' + item.date + ' ' + item.puntaje; // Ajusta esto según la estructura de tus datos
            li.className = 'five_essay_li'
            five_essay_ul.appendChild(li);
        });

    }

    return (
        <>
            <div className='containerDashboard'>
                <ul className='insights'>
                    <li>
                        <i class='resumen bx bx-calendar-check'></i>
                        <span className='info'>
                           

                      


                            <h3 id='essayScoreRecent'></h3>

                            <p href="username">Ensayo más reciente</p>
                      

                        </span>
                    </li>
                    <li>
                        <i class='resumen bx bx-globe'></i>
                        <span className='info'>
                            

                            <h3 id='essayAverageScore'></h3>
                            <p href="username">Promedio de puntajes</p>
                        </span>
                    </li>
                    <li>
                    <i class='resumen bx bxs-arrow-to-top' ></i>
                        <span className='info'>
                           

                            <p id='essayNameBest'></p>


                            <h3 id='essayScoreBest'></h3>
                            <p href="username">Puntaje máximo</p>

                        </span>
                    </li>
                </ul>
                <div className='bottom-data'>
                    <div className='orders'>
                        <div className='header'>
                            <i class='bx bx-receipt'></i>
                            <h3>Evolución de puntaje</h3>
                            <i class='bx bx-filter'></i>
                            <i class='bx bx-search'></i>
                        </div>
                        <div className='containerGraphicData'>
                            <div className='graphicData'>
                                <LinesChart />
                            </div>
                        </div>
                        
                    </div>
                    <div class="reminders">
                    <div class="header">
                        <i class='bx bx-note'></i>
                        <h3>Ultimos ensayos</h3>
                        <i class='bx bx-filter'></i>
                        <i class='bx bx-plus'></i>
                    </div>
                    <ul class="task-list">
                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p>Start Our Meeting</p>
                            </div>
                            <i class='bx bx-dots-vertical-rounded'></i>
                        </li>
                        <li class="completed">
                            <div class="task-title">
                                <i class='bx bx-check-circle'></i>
                                <p>Analyse Our Site</p>
                            </div>
                            <i class='bx bx-dots-vertical-rounded'></i>
                        </li>
                        <li class="not-completed">
                            <div class="task-title">
                                <i class='bx bx-x-circle'></i>
                                <p>Play Footbal</p>
                            </div>
                            <i class='bx bx-dots-vertical-rounded'></i>
                        </li>
                    </ul>
                </div>
                </div>
            
                
            </div>

        </>
    )
}

export default Statistics;
