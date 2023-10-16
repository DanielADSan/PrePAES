import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import puntajesData from './puntajesData';
import '../../styles/puntajecorte.css';
function PuntajesDeCorte() {
    const [sidebarActive, setSidebarActive] = useState(JSON.parse(localStorage.getItem("sidebarActive")) || false);

    const toggleSidebar = () => {
        setSidebarActive(prevState => !prevState);
    };
    useEffect(() => {
        localStorage.setItem("sidebarActive", sidebarActive);
    }, [sidebarActive]);
    const [universidadSeleccionada, setUniversidadSeleccionada] = useState('Universidad de Chile');

    // Función para cambiar la universidad seleccionada
    const handleUniversidadChange = (event) => {
        setUniversidadSeleccionada(event.target.value);
    };

    return (
        <>
            <Sidebar sidebarActive={sidebarActive} ubicacionActual={"Puntaje de Corte"} />
            <div className="content " >
                <Navbar toggleSidebar={toggleSidebar} />
                <main >
            <div className='contenedorHistorial' style={{height:'850px',borderRadius:'9px'}} >
                {/* Dropdown para seleccionar la universidad */}
                <select className='w-20 align-self-center mt-4 p-2 rounded'  value={universidadSeleccionada} onChange={handleUniversidadChange}>
                    {Object.keys(puntajesData).map((universidad) => (
                        <option key={universidad} value={universidad}>
                            {universidad}
                        </option>
                    ))}
                </select>

                {/* Tabla de puntajes */}
                <table>
                    <thead>
                        <tr className='label'>
                            <h5>Programa</h5>
                            <h5>Puntaje</h5>
                        </tr>
                    </thead>
                    
                        {puntajesData[universidadSeleccionada].map((carrera) => (
                            <div className='info' key={carrera.programa}>
                                <div className='list-info'>{carrera.programa}</div>
                                <div className='list-info'>{carrera.puntaje}</div>
                            </div>
                        ))}
                 
                </table>
            </div>
                </main>
            </div>
        </>
    );
}

export default PuntajesDeCorte;
