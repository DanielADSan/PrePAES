import React from 'react'
import { useState, useEffect } from 'react'
import Historial from './Historial'
import axios from 'axios';
import { motion } from "framer-motion"
import { Apiurl } from '../../../Services/apirest';
import Navbar from '../../Navbar';
import Sidebar from '../../Sidebar';
import '../../../styles/historial.css'
import Statistics from '../Resumen/Statistics';
import '../../../styles/statistics.css';
import Estadisticas from '../estadisticas/Estadisticas';
const PaginacionHistorial = () => {
    const [selectedButton, setSelectedButton] = useState('Resumen');
    const handleButtonClick = (button) => {
        setSelectedButton(button);
    }
    const [historial, setHistorial] = useState([]);
    const [sidebarActive, setSidebarActive] = useState(JSON.parse(localStorage.getItem("sidebarActive")) || false);

    const toggleSidebar = () => {
        setSidebarActive(prevState => !prevState);
    };
    useEffect(() => {
        localStorage.setItem("sidebarActive", sidebarActive);
    }, [sidebarActive]);
    const user_id = localStorage.getItem('user_id');
    const [error, setError] = useState(false);
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get(Apiurl + "history/" + user_id + "/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                const historialArray = Object.values(res.data);
                console.log(historialArray);
                if (historialArray.length === 0) {
                    setError(true);

                }
                const historialFiltrado = historialArray.filter((dato) => dato != null && dato.puntaje < 1000);

                setHistorial(historialFiltrado.reverse());

            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Sidebar sidebarActive={sidebarActive} ubicacionActual={"Progreso"} />
            <div className="content">
                <Navbar toggleSidebar={toggleSidebar} />

                <main>
                    <div className="header">
                        <div className="left">
                            <h1>Progreso</h1>
                        </div>
                    </div>

                    <div className='contenedorProgreso'>

                        <div className="container-enunciados">

                            <div className="toggle-button">

                                <motion.button
                                    className={selectedButton === 'Resumen' ? 'Resumen active' : 'Resumen'}
                                    onClick={() => handleButtonClick('Resumen')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Resumen
                                </motion.button>
                                <motion.button
                                    className={selectedButton === 'Historial' ? 'Historial active' : 'Historial'}
                                    onClick={() => handleButtonClick('Historial')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Historial
                                </motion.button>

                                <motion.button
                                    className={selectedButton === 'Estadísticas' ? 'Estadísticas active' : 'Estadísticas'}
                                    onClick={() => handleButtonClick('Estadísticas')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Estadísticas
                                </motion.button>
                                <motion.div
                                    className="indicator"
                                    layoutId="indicator"
                                    initial={false}
                                    animate={{ x: selectedButton === 'Historial' ? 0 : '50%' }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            </div>
                        </div>

                        {error && <div className="sinDatos"><h4>Aún no realizas un ensayo ...</h4></div>}
                        {selectedButton === 'Resumen' && (
                            <Statistics />)}
                        {selectedButton === 'Historial' && (
                            <Historial
                                items={historial}>
                            </Historial>
                        )}
                        {selectedButton === 'Estadísticas' && (
                            <Estadisticas
                                items={historial}>
                            </Estadisticas>
                        )}

                    </div>
                </main>
            </div>
        </>
    )
}
export default PaginacionHistorial;        