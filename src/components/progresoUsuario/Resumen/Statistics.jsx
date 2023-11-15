import { useState, useEffect } from 'react' /*por defecto, useEffect rederiza todo lo dentro al cargar la pagina*/
import LinesChart from './lineChart';
import { Apiurl } from '../../../Services/apirest';
import axios from 'axios';
import { corregirOrtografia } from '../../../helper/Ortografía';
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
    const [spinner1,setSpinner1] = useState(true);
    const [spinner2,setSpinner2] = useState(true);
    const [spinner3,setSpinner3] = useState(true);
    const [spinner4,setSpinner4] = useState(true);
    const [spinner5,setSpinner5] = useState(true);
    async function EssayData() {
        const token = localStorage.getItem("token");

        try {
            const essayMostRecentData = await axios.get(ApiEssayMostRecent, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setEssayScoreRecent(essayMostRecentData.data.puntaje.toFixed(0))
            setSpinner1(false);
        } catch (error) {
            console.error(error);
            setEssayScoreRecent('No hay ensayos')
            setSpinner1(false);
        }
    }

    async function EssayAverageBestData() {
        const token = localStorage.getItem("token");

        try {
            const essayMostRecentData = await axios.get(ApiEssayBestScore, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEssayAverageScore(essayMostRecentData.data.average.toFixed(0)) 
            setEssayScoreBest(essayMostRecentData.data.bestScore.puntaje.toFixed(0))
            setSpinner2(false);
        } catch (error) {
            console.error(error);
            setEssayAverageScore('No hay ensayos')
            setEssayScoreBest('No hay ensayos')
            setSpinner2(false);
        }
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
        setSpinner3(false);
    }

    return (
        <>
            <div className='containerDashboard'>
                <ul className='insights'>
                    <li style={{cursor:'auto'}}>
                        <i className='resumen bx bx-calendar-check'></i>
                        <span className='info'>
                            {spinner1 && (
                                <div className="spinner loading"></div>
                            )}
                            {!spinner1 && (   
                            <h3>{essayScoreRecent}</h3>
                            )}
                            <p href="username">Ensayo más reciente</p>                    
                        </span>
                    </li>
                    <li style={{cursor:'auto'}}>
                        <i className='resumen bx bx-globe'></i>
                        <span className='info'>
                            
                            {spinner2 && (
                                <div className="spinner loading"></div>
                            )}
                            {!spinner2 && (
                            <h3>{essayAverageScore}</h3>
                            )}
                            <p href="username">Promedio de puntajes</p>
                        </span>
                    </li>
                    <li style={{cursor:'auto'}}>
                    <i className='resumen bx bxs-arrow-to-top' ></i>
                        <span className='info'>
                            {spinner2 && (
                                <div className="spinner loading"></div>
                            )}
                            {!spinner2 && (
                            <h3>{essayScoreBest}</h3>
                            )}
                            <p href="username">Puntaje máximo</p>

                        </span>
                    </li>
                </ul>
                <div className='bottom-data'>
                    <div className='orders'>
                        <div className='header'>
                            <i className='bx bx-stats' style={{cursor:'auto'}}></i>
                            <h3>Evolución de puntaje</h3>
                            {spinner4 && (
                               
                               <div className="spinner loading" ></div>
                        
                       )}
                            {/*<i className='bx bx-filter'></i>*/}
                  
                        </div>
                        
                                <LinesChart setSpinner4={setSpinner4}/>
                         
                   
                        
                    </div>
                    <div className="orders">
                    <div className="header">
                    <i className='bx bx-history' style={{cursor:'auto'}}></i>
                        <h3>Ultimos ensayos</h3>
                        {spinner3 && (
                               
                               <div className="spinner loading" ></div>
                        
                       )}
                        {/*<i className='bx bx-filter'></i>*/}            
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
                                    <td><p>{corregirOrtografia(ensayo.name)}</p></td>
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
