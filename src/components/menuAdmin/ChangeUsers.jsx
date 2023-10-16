import React, { useState, useEffect } from 'react';
import axios from 'axios';
import replace from 'react-string-replace'; // Importa la biblioteca react-string-replace
import { InlineMath } from "react-katex";
import { Apiurl } from '../../Services/apirest';

const ApiUrl = Apiurl + "questions_alternativeSpecific/";


const ChangeUsers = () => {
    const token = localStorage.getItem('token');
    const [form, setForm] = useState({
        "id": "",
        "username": "",
        "email": "",
        "password": "",
    });
    const [error, setError] = useState(false);
    const [alert, setAlert] = useState(false);
    const [errorNotFound, setErrorNotFound] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [alertMsg, setalertMsg] = useState("");
    const [errorNotFoundMsg, setErrorNotFoundMsg] = useState("");
    const [errorEmailMsg, setErrorEmailMsg] = useState("");
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [search, setSearch] = React.useState('');
    const [paginaActual, setPaginaActual] = React.useState(0);
    const itemsPorPagina = 4;
    const [totalPaginas, setTotalPaginas] = React.useState(0);
    const [selectFiltro, setSelectFiltro] = React.useState('4');
    const [filtrarPor, setFiltrarPor] = React.useState(true);
    const [focusFiltrar, setFocusFiltrar] = React.useState(false)
    const manejadorSubmit = (e) => {
        e.preventDefault();
    };

    const manejadorChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const manejadorBoton = () => {

        if (!form.id || !form.email || !form.username) {
            setError(true);
            setErrorMsg("Todos los campos son necesarios.");
            setTimeout(() => {
                setError(false);
            }, 2000);
        }
        else{
            const url = Apiurl + "users/" + form.id + "/";
            axios.put(url, form, {
                headers: {
                    Authorization: `Bearer ${token}` // Agrega el token en los headers
                }
            })
            .then(response => {
                    console.log(response.data);
                    setAlert(true);
                    setalertMsg("Cambio exitoso!");
                    cargarListado(); // Llama a cargarListado para actualizar la tabla
                    setTimeout(() => {
                        setAlert(false);
                    }, 2000);
            })
            .catch(error => {
                    
                    
                    if (error.response.status == 404){
                        setErrorNotFound(true);
                        setErrorNotFoundMsg("Usuario no encontrado verifique el id!");
                        setTimeout(() => {
                            setErrorNotFound(false);
                        }, 2000);
                    }

                    if (error.response.status == 400){
                        setErrorEmail(true);
                        setErrorEmailMsg("El email ingresado ya se encuentra en uso!");
                        setTimeout(() => {
                            setErrorEmail(false);
                        }, 2000);
                    }
                        

                    console.log(error.response.data);
                });    
        }




        
    };

    useEffect(() => {
        const urlAll = Apiurl + "users/all/";
        axios.get(urlAll, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token en los headers
            }
        })
            .then(response => {
                setUsers(response.data);
                setTotalPaginas(Math.ceil(response.data.length / itemsPorPagina - 1));
                setStatus(true);
                setError(false);
                console.log(users)
            });
    }, [status]);

    const handleClick = (id, username, email, password) => {
        setForm({
            id: id,
            username: username,
            email: email,
            password: password
        });

    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    //guardamos el valor del search que pone el usuario.
    const onSearchChange = ({ target }) => {
        setSearch(target.value);
        //cada vez que haya una busqueda se ira automaticamente a la primera pagina.
        setPaginaActual(0);
    };
    const cargarListado = async () => {
        try {
            const urlAll = Apiurl + 'users/all/';
            const response = await axios.get(urlAll, {
                headers: {
                    Authorization: `Bearer ${token}` // Agrega el token en los headers
                }
            });
            setUsers(response.data);
            setStatus(true);
            setAlert(true);
            setalertMsg('Cambio exitoso!');
            setTimeout(() => {
                setAlert(false);
                setalertMsg('');
            }, 2000); // Desaparecer el mensaje después de 2 segundos
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const FiltroSelect = (ensayo) => {

        return ensayo
    }
    const BusquedaNombre = () => {
        // si no han ingresado una busqueda, enviamos la lista completa.
        if (!search) {
            const datosHistorial = users;
            const indexInicio = paginaActual * itemsPorPagina

            return datosHistorial.slice(indexInicio, indexInicio + itemsPorPagina)
        }
        // creamos una variable y pasamos la busqueda a minusculas


        const filtrado = users.filter((ensayo) =>//################################################################################################
            ensayo.id.toString().includes(search)
        );


        // setBusquedaVacia(false);
        if (selectFiltro) {
            FiltroSelect(filtrado);
        }
        const indexInicio = paginaActual * itemsPorPagina;
        const itemsPagina = filtrado.slice(indexInicio, indexInicio + itemsPorPagina);

        return itemsPagina;
    }
      
    // guardamos valor del filtro select.
    const onSelectChange = ({ target }) => {
        setSelectFiltro(target.value);
        if (target.value != '') {
            setFiltrarPor(false)
        } else {
            setFiltrarPor(true)
        }
    }
    const largoBusqueda = () => {
        if (!search){
           
             return users.length
        }

        const filtrado = users.filter(ensayo => ensayo.id)//#############################################################################
        return filtrado.length;
    }
 
    const handleFocus = () => {
        setFocusFiltrar(true)
    }

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



    return (
        <React.Fragment>
            <div className=''>
  
                <div className=''>


                    <div className='mt-3'>
                        
                        <div className='bottom-data'>
                            <div class="orders">
                                <div class="header">
                                    <i class='bx bx-history' ></i>
                                    <h3>Listado de Usuarios</h3>
                                    <div className=''>
                            <input
                                className="form-control  " 
                                type="search" placeholder="Buscar Usuario"
                                aria-label="Search"
                                onChange={onSearchChange}
                            >
                            </input>
                            {BusquedaNombre().length === 0 && users.length > 0 && (
                                <p className="invalid-feedback d-block fallida">
                                    No se encontro ningun resultado!
                                </p>)}
                        </div>
                                    <i class='bx bx-filter'></i>

                                </div>
                                <table  >
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre de usuario</th>
                                            <th>Correo electronico</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {status === true && (
                                            BusquedaNombre().map((users, i) => (
                                                <tr key={i} onClick={() => handleClick(users.id, users.username, users.email, users.password)}>
                                                    <td>{users.id}</td>
                                                    <td>{users.username}</td>
                                                    <td>{users.email}</td>
                                            
                                                    {/* 
                                                    <td>
                                                        <a href={question.link_resolution} target="_blank" rel="noopener noreferrer">
                                                            URL
                                                        </a>
                                                    </td>
                                                    */}
                                                    
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                                <div className='Botones'>
                                    <ul className="pagination">
                                        <li onClick={previousPage} className="page-item"><a className="page-link" href="#">Retroceder</a></li>
                                        <li className="page-item" onClick={()=>{setPaginaActual(1)}}><a className="page-link" href="#"><i class='bx bx-chevrons-left' style={{fontSize:'16px'}}></i></a></li>
                                        <li className="page-item"><a className="page-link" href="#">{paginaActual}</a></li>
               
                                        <li className="page-item" onClick={()=>{setPaginaActual(totalPaginas)}}><a className="page-link" href="#"><i class='bx bx-chevrons-right' style={{fontSize:'16px'}}></i></a></li>
                                    
                                        <li onClick={nextPage} className="page-item"><a className="page-link" href="#">Avanzar</a></li>
                                    </ul>
                                   
                                </div>
                                
                            </div>
                            
                            <div className='orders'>
                        <div className='header'>
                            <i class='bx bx-stats'></i>
                            <h3>Modificar Usuario</h3>
                            <i class='bx bx-filter'></i>
                  
                        </div>
                        <form className="form-horizontal" action="/action_page.php" onSubmit={manejadorSubmit}>
                            <div className="form-group">
                                <label className="control-label" htmlFor="id">ID del usuario:</label>
                                <div className="">
                                    <input type="text" name="id" className="form-control busqueda " id="id" onChange={manejadorChange} value={form.id} style={{border: "1px solid #ced4da"}} placeholder="Inserte ID" />
                                </div>
                            </div>

                            <div className="form-group mt-3">
                                <label className="control-label " htmlFor="username">Nombre del usuario:</label>
                                <div className="">
                                    <input type='text' name="username" className="form-control" id="username" onChange={manejadorChange} value={form.username} style={{border: "1px solid #ced4da"}} placeholder="Inserte Nombre de usuario" />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label className="control-label " htmlFor="email">Correo electronico:</label>
                                <div className="">
                                    <input type='email' name="email" className="form-control" id="email" onChange={manejadorChange} value={form.email} style={{border: "1px solid #ced4da"}} placeholder="Inserte Correo electronico" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 ">
                                    <button type="button" className="btn btn-dark mt-2" onClick={manejadorBoton}>Modificar</button>
                                    {alert === true && (
                                        <div className="alert alert-success mt-3" role="alert">
                                            {alertMsg}
                                        </div>
                                    )}
                                    {error === true && (
                                        <div className="alert alert-danger mt-3" role="alert">
                                            {errorMsg}
                                        </div>
                                    )}
                                    {errorNotFound === true && (
                                        <div className="alert alert-danger mt-3" role="alert">
                                            {errorNotFoundMsg}
                                        </div>
                                    )}
                                    {errorEmail === true && (
                                        <div className="alert alert-danger mt-3" role="alert">
                                            {errorEmailMsg}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>                              
                        
                    </div>
                        </div>


                    </div>
                   
                </div>
            </div>

        </React.Fragment>
    );
};

export default ChangeUsers;