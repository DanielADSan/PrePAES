import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import axios from 'axios';
import algebra from "../../images/algebra.png";
import geometria from "../../images/geometria.png";
import numeros from "../../images/numeros.png";
import probabilidad from "../../images/probabilidad.png";
import signo from "../../images/signo.png";
import calificación from "../../images/calificacion.png";
import { Apiurl } from "../../Services/apirest"
const ResumenPrePAES = () => {
    const [sidebarActive, setSidebarActive] = useState(JSON.parse(localStorage.getItem("sidebarActive")) || false);

    const toggleSidebar = () => {
        setSidebarActive(prevState => !prevState);
    };
    useEffect(() => {
        localStorage.setItem("sidebarActive", sidebarActive);
    }, [sidebarActive]);
    const [selectedButton, setSelectedButton] = useState('Resumen');
    const handleButtonClick = (button) => {
        setSelectedButton(button);
    }
    const numeroFase = localStorage.getItem('numeroFase');
    const navigate = useNavigate();  // Get the navigate function
    const urlStadictis = `${Apiurl}PrePAES_stadictis/`;
    const [estadoDificultad, setEstadoDificultad] = useState([]);
    const [mejorCategoria, setMejorCategoria] = useState('');
    const [peorCategoria, setPeorCategoria] = useState('');
    const [promedio, setPromedio] = useState('');

    useEffect(() => {
        const getEstadisticas = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(urlStadictis, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data)
                setEstadoDificultad(response.data[2]);
                setMejorCategoria(response.data[0].Correcta);
                setPeorCategoria(response.data[0].Reforzar);
                setPromedio(response.data[3])
            } catch (error) {
                // Manejar el error de alguna manera, por ejemplo, mostrando un mensaje de error al usuario o registrando el error en un sistema de registro.
                console.error('Ocurrió un error al obtener estadísticas:', error);
            }
        };
        getEstadisticas();
        console.log(`Tu mejor categoria es: ${mejorCategoria} y tu peor categoria es: ${peorCategoria}`)
    }, []);



    return (
        <>
            <Sidebar sidebarActive={sidebarActive} ubicacionActual={"MetodoPrePAES"} />
            <div className="content">
                <Navbar toggleSidebar={toggleSidebar} />
                <main>

                    <div className="header">
                        <div className="left">
                            <h1>Método PrePAES</h1>
                        </div>
                    </div>
                    <div className='number_phase' >
                        <div className="toggle-button-fase" style={{ gridColumnStart: '2', justifySelf: 'center' }}>

                            <motion.button
                                className={selectedButton === 'Fase' ? 'Fase active' : 'Fase'}
                                onClick={() => { handleButtonClick('Fase'); navigate('/MetodoPrePAES') }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}

                            >
                                Fase {numeroFase}
                            </motion.button>
                            <motion.button
                                className={selectedButton === 'Resumen' ? 'Resumen active' : 'Resumen'}
                                onClick={() => handleButtonClick('Resumen')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                Resumen
                            </motion.button>
                        </div>
                    </div>
                    <ul className="insights">
                       
                            <li >
                            <img className="bx" src={peorCategoria === "numeros" ? numeros : peorCategoria === "algebra" ? algebra : peorCategoria === "geometria" ? geometria : peorCategoria === "probabilidades" ? probabilidad : signo} />
                                <span className="info">
                                    <h3>{peorCategoria === "numeros" ? "Números" : peorCategoria === "algebra" ? "Álgebra y Funciones" : peorCategoria === "geometria" ? "Geometría" : peorCategoria === "probabilidades" ? "Probabilidad y Estadística" : "Aún no existe"}</h3>
                                    <p>Categoría más Debil</p>
                                </span>

                            </li>
                            <li >
                                {/*<img className="bx" src={} />+*/}
                                <img className="bx" src={mejorCategoria === "numeros" ? numeros : mejorCategoria === "algebra" ? algebra : mejorCategoria === "geometria" ? geometria : mejorCategoria === "probabilidades" ? probabilidad : signo} />
                                <span className="info">
                                    <h3>{mejorCategoria === "numeros" ? "Números" : mejorCategoria === "algebra" ? "Álgebra y Funciones" : mejorCategoria === "geometria" ? "Geometría" : mejorCategoria === "probabilidades" ? "Probabilidad y Estadística" : "Aún no existe"}</h3>
                                    <p>Categoría más Fuerte</p>
                                </span>

                            </li>
                            <li >
                                <img className="bx" src={calificación}/>
                                <span className="info">
                                    <h3>{promedio}</h3>
                                    <p>Promedio general</p>
                                </span>

                            </li>    
                    </ul>
                    <ul className='insights'>
                    <li>            
                                    <div className={`colorDificultad ${estadoDificultad.probabilidades}`}></div>
                                    <span className='info'>
                                        
                                        <h3>Probabilidades: {estadoDificultad.probabilidades}</h3>
                                        <p>Estado de Dificultad </p>
                                    </span>
                                    
                                </li>
                                <li>
                                <div className={`colorDificultad ${estadoDificultad.algebra}`}></div>
                                    <span className='info'>
                                        <h3>Álgebra: {estadoDificultad.algebra}</h3>
                                        <p>Estado de Dificultad </p>
                                    </span>
                                    
                                </li>
                                <li>
                                <div className={`colorDificultad ${estadoDificultad.geometria}`}></div>
                                    <span className='info'>
                                        <h3>Geometría: {estadoDificultad.geometria}</h3>
                                        <p>Estado de Dificultad </p>
                                    </span>
                                    
                                </li>
                                <li>
                                <div className={`colorDificultad ${estadoDificultad.numeros}`}></div>
                                    <span className='info'>
                                        <h3>Números: {estadoDificultad.numeros}</h3>
                                        <p>Estado de Dificultad </p>
                                    </span>
                                    
                                </li>
                    </ul>
                </main>
            </div>
        </>
    );
};

export default ResumenPrePAES;
