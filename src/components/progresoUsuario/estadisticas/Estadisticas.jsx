import React, { useEffect, useState, useRef } from 'react';
import LinesChart from './LinesChart';
import PieChart from './PiesChart';
import axios from 'axios';
import { Apiurl } from '../../../Services/apirest';
const Estadisticas = ({ items }) => {
        const urlGetPercentage = Apiurl + 'percentage_math_type/';
        const [percentage, setPercentage] = useState({});
        const [categoria, setCategoria] = useState({});
        const getPercentage = async () => {
                const token = localStorage.getItem('token');
                const res = await axios.get(urlGetPercentage, {
                        headers: {
                                Authorization: `Bearer ${token}`,
                        },
                });
                setPercentage(res.data[0]);
                setCategoria(res.data[0].algebra);
                console.log(res.data[0])
        }
        useEffect(() => {
                getPercentage();
            
        }, []);
        
        const onSelectChange = ({ target }) => {
                
                if (target.value == 'algebra') {
                        setCategoria(percentage.algebra)
                }
                if (target.value == 'numeros') {
                        setCategoria(percentage.numeros)
                }
                if (target.value == 'geometria') {
                        setCategoria(percentage.geometria)
                }
                if (target.value == 'probabilidades') {
                        setCategoria(percentage.probabilidades)
                }
            }

        return (
                <div className="">
                        <div className='bottom-data'>
                                <div className='orders'>
                                        <div className='header'>
                                                <i className='bx bx-stats' style={{cursor:'auto'}}></i>
                                                
                                                <h3>Evolución de puntaje</h3>

                                                {/*<i className='bx bx-filter'></i>*/}

                                        </div>

                                        <LinesChart />



                                </div>
                                <div className="orders">
                                        <div className="header">
                                                <i className='bx bx-history'style={{cursor:'auto'}} ></i>
                                                <h3 style={{display:'flex'}}>Porcentaje de acierto</h3>
                                                <select className='form-select ' style={{fontSize:'23px', fontWeight:'600', padding:'.3rem'}} onChange={onSelectChange}>
                                                        <option value="algebra">Álgebra</option>
                                                        <option value="numeros">Números</option>
                                                        <option value="geometria">Geometría</option>
                                                        <option value="probabilidades">Probabilidades</option>
                                                </select>
                                                

                                                {/*<i className='bx bx-filter'></i>*/}

                                        </div>
                                        <div style={{ width: '100%', height: '100%', maxHeight:'500px', padding: '10px 0' }}>
                                                <PieChart dataPercentage={categoria} />
                                        </div>

                                </div>

                        </div>

                </div>


        );
};
export default Estadisticas;