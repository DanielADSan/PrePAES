import React, { useState, useEffect } from 'react';
import SidebarAdmin from './SidebarAdmin'
import NavbarAdmin from './NavbarAdmin'
import { Apiurl } from '../../Services/apirest';
import axios from 'axios';

function Notificaciones() {
    const urlGetError = `${Apiurl}questions_error/`;
    const [sidebarActive, setSidebarActive] = useState(JSON.parse(localStorage.getItem("sidebarActive")) || false);

    const toggleSidebar = () => {
        setSidebarActive(prevState => !prevState);
    };
    useEffect(() => {
        localStorage.setItem("sidebarActive", sidebarActive);
    }, [sidebarActive]);


    const [errors, setErrors] = useState([]);
    const [stateVideos, setStateVideos] = useState([]);
    const [spinnerState, setSpinnerState] = useState(false);
    const [paginaActual, setPaginaActual] = React.useState(1);
    useEffect(() => {
        const getErrors = async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(urlGetError, { headers: { "authorization": `Bearer ${token}` } });
            setErrors(res.data);
        };
        getErrors();
    }, []);
    //funcion para avanzar de pagina.
    const nextPage = () => {
        const totalPaginas = largoBusqueda();

        if ((paginaActual + 1) * itemsPorPagina < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
    }

    // funcion para retroceder de pagina.
    const previousPage = () => {
        if (paginaActual > 0) {
            setPaginaActual(paginaActual - 1);
        }
    }
    const verificarEstadoVideos = async () => {
        setSpinnerState(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`${Apiurl}questions_url_validator/`, {
             headers: {
                 "authorization": `Bearer ${token}` 
                } 
            })
        setSpinnerState(false);

        console.log(res.data);
        setStateVideos(res.data);
    }

    const manejadorBoton = (id) => {
       
        const url = Apiurl + "questions_error/admin/" + id + "/";
        axios.patch(url, {
            is_deleted: true
        },{headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` // Agrega el token en los headers
            }
        }).then(response => {
           
            getErrors();
        });
    };
    
    const getErrors = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get(urlGetError, { headers: { "authorization": `Bearer ${token}` } });
        setErrors(res.data);
    };


    return (
        <>
            <SidebarAdmin sidebarActive={sidebarActive} ubicacionActual={"Notificaciones"} />
            <div className="content">
                <NavbarAdmin toggleSidebar={toggleSidebar} />
                <main>
                    <div className="header">
                        <div className="left">
                            <h1>Notificaciones</h1>
                        </div>
                    </div>

                    <div className='bottom-data'>
                        <div className="orders">
                            <div className="header">
                                <i className='bx bx-history' ></i>
                                <h3>Listado de Errores</h3>
                                <div className=''>


                                </div>
                                <i className='bx bx-filter'></i>

                            </div>
                            <table  >
                                <thead>
                                    <tr>
                                        <th>Mensaje</th>
                                        <th>Tipo de error</th>
                                        <th>Id Pregunta</th>
                                        <th>Opción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {errors.map((error) => (
                                        <tr key={error.id}>
                                            <td>{error.message}</td>
                                            <td>{error.type_error}</td>
                                            <td>{error.question}</td>
                                            <td style={{display:'grid',placeContent:'center'}}>
                                                <i class='bx bx-list-plus' onClick={()=>manejadorBoton(error.id)}></i>
                                            </td>   
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <div className='Botones'>
                                <ul className="pagination">
                                    <li onClick={previousPage} className="page-item"><a className="page-link" href="#">Retroceder</a></li>
                                    <li className="page-item" onClick={() => { setPaginaActual(1) }}><a className="page-link" href="#"><i className='bx bx-chevrons-left' style={{ fontSize: '16px' }}></i></a></li>
                                    <li className="page-item"><a className="page-link" href="#">{paginaActual}</a></li>

                                    <li className="page-item" onClick={() => { setPaginaActual(totalPaginas) }}><a className="page-link" href="#"><i className='bx bx-chevrons-right' style={{ fontSize: '16px' }}></i></a></li>

                                    <li onClick={nextPage} className="page-item"><a className="page-link" href="#">Avanzar</a></li>
                                </ul>

                            </div>

                        </div>

                        <div className='orders'>
                            <div className='header'>
                                <i className='bx bx-stats'></i>
                                <h3>Verificar estado de Videos</h3>

                                <button onClick={() => verificarEstadoVideos()} className='btn btn-outline-dark' style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', gap: '.5rem', fontWeight: 'bold' }}>Verificar <i className={spinnerState == false ? 'bx bx-loader ' : 'bx bx-loader cargando'}></i></button>

                            </div>
                            <table  >
                                <thead>
                                    <tr>
                                        <th>ID Pregunta</th>
                                        <th>Url Video</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stateVideos.map((video) => (
                                        <tr key={video.id}>
                                            <td>{video.id}</td>
                                            <td><a style={{color:'var(--dark)'}} href={video.link_resolution} target="_blank">{video.link_resolution}</a></td>
                                            <td>{ video.state == '301' ? <i  class='bx bxs-error text-warning' ></i> : <i class='bx bxs-error  text-danger'></i>}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                        </div>
                    </div>





                </main>
            </div>
        </>
    )
}

export default Notificaciones