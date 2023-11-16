import React, { useState, useEffect } from 'react';
import axios from 'axios';
import replace from 'react-string-replace'; // Importa la biblioteca react-string-replace
import { InlineMath } from "react-katex";
import { Apiurl } from '../../Services/apirest';

const ApiUrl = Apiurl + "questions_alternativeSpecific/";


const ChangeQuestions = () => {
    const token = localStorage.getItem('token');
    const [form, setForm] = useState({
        "id": "",
        "question": "",
        "link_resolution": ""
    });
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [errorLink, setErrorLink] = useState(false);
    const [errorLinkMsg, setErrorLinkMsg] = useState("");
    const [errorNotFound, setErrorNotFound] = useState(false);
    const [errorNotFoundMsg, setErrorNotFoundMsg] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [questions, setQuestions] = useState([]);
    const [status, setStatus] = useState(false);
    const [alternatives, setAlternatives] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [search, setSearch] = React.useState('');
    const [paginaActual, setPaginaActual] = React.useState(0);
    const itemsPorPagina = 4;
    const [totalPaginas, setTotalPaginas] = React.useState(0);
    const [selectFiltro, setSelectFiltro] = React.useState('4');
    const [filtrarPor, setFiltrarPor] = React.useState(true);
    const [focusFiltrar, setFocusFiltrar] = React.useState(false)
    const ecuacionRegex = /\[(.*?)\]/g; // Expresión regular para detectar partes de la cadena que contienen ecuaciones
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
        if (!form.id || !form.question || !form.link_resolution) {
            setError(true);
            setErrorMsg("Todos los campos son necesarios.");
            setTimeout(() => {
                setError(false);
            }, 2000);
            return
        }
        else{
            const url = Apiurl + "questions/" + form.id + "/";
            axios.put(url, form, {
                headers: {
                    Authorization: `Bearer ${token}` // Agrega el token en los headers
                }
            }).then(response => {
                setAlert(true);
                setAlertMsg("Cambio exitoso!");
                setTimeout(() => {
                    setAlert(false);
                }, 2000);
                cargarListado(); // Llama a cargarListado para actualizar la tabla
            }).catch(error => {

                if (error.response.status == 404){
                    setErrorNotFound(true);
                    setErrorNotFoundMsg("Pregunta no encontrada verifique el id!");
                    setTimeout(() => {
                        setErrorNotFound(false);
                    }, 2000);
                }
                
                if (error.response.status == 400){
                    setErrorLink(true);
                    setErrorLinkMsg(error.response.data['message']);
                    setTimeout(() => {
                            setErrorLink(false);
                    }, 2000);
                }
                console.log(error.response.data);
            });  
        } 
    };
    const manejadorEliminar = () => {
        console.log('eliminar');
        if (!form.id) {
            setError(true);
            setErrorMsg("Seleccione una pregunta para la eliminación");
            setTimeout(() => {
                setError(false);
            }, 2000);
            return
        }
        else{
            const url = Apiurl + "questions/" + form.id + "/";
            axios.patch(url, {
                is_deleted: true
            }, {headers: {
                    Authorization: `Bearer ${token}` // Agrega el token en los headers
                }
            }).then(response => {
                setAlert(true);
                setAlertMsg("Eliminación exitosa!");
                setTimeout(() => {
                    setAlert(false);
                }, 2000);
                cargarListado(); // Llama a cargarListado para actualizar la tabla
            }).catch(error => {

                if (error.response.status == 404){
                    setErrorNotFound(true);
                    setErrorNotFoundMsg("Pregunta no encontrada verifique el id!");
                    setTimeout(() => {
                        setErrorNotFound(false);
                    }, 2000);
                }
                
                if (error.response.status == 400){
                    setErrorLink(true);
                    setErrorLinkMsg(error.response.data['message']);
                    setTimeout(() => {
                            setErrorLink(false);
                    }, 2000);
                }
                console.log(error.response.data);
            });  
        } 
    };
    const manejadorRecuperar = () => {
        console.log('recuperar');
        if (!form.id) {
            setError(true);
            setErrorMsg("Seleccione una pregunta para la modificación");
            setTimeout(() => {
                setError(false);
            }, 2000);
            return
        }
        else{
            const url = Apiurl + "questions/" + form.id + "/";
            axios.patch(url, {
                is_deleted: false
            }, {headers: {
                    Authorization: `Bearer ${token}` // Agrega el token en los headers
                }
            }).then(response => {
                setAlert(true);
                setAlertMsg("Modificación exitosa!");
                setTimeout(() => {
                    setAlert(false);
                }, 2000);
                cargarListado(); // Llama a cargarListado para actualizar la tabla
            }).catch(error => {

                if (error.response.status == 404){
                    setErrorNotFound(true);
                    setErrorNotFoundMsg("Pregunta no encontrada verifique el id!");
                    setTimeout(() => {
                        setErrorNotFound(false);
                    }, 2000);
                }
                
                if (error.response.status == 400){
                    setErrorLink(true);
                    setErrorLinkMsg(error.response.data['message']);
                    setTimeout(() => {
                            setErrorLink(false);
                    }, 2000);
                }
                console.log(error.response.data);
            });  
        } 
    };

    useEffect(() => {
        const urlAll = Apiurl + "questions/list/all/";
        axios.get(urlAll, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token en los headers
            }
        })
            .then(response => {
                setQuestions(response.data);
                setTotalPaginas(Math.ceil(response.data.length / itemsPorPagina - 1));
                setStatus(true);
                setError(false);
                setErrorLink(false);
                console.log(questions)
            });
    }, [status]);

    const handleClick = (id, question, link_resolution) => {
        setForm({
            id: id,
            question: question,
            link_resolution: link_resolution
        });

    };

    const handleViewAlternatives = (id) => {
        const url = ApiUrl + `${id}/`;
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}` // Agrega el token en los headers
            }
        })
            .then(response => {
                setAlternatives(response.data.answer);
                setShowPopup(true);
            })
            .catch(error => {
                console.log(error.response.data);
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
            const urlAll = Apiurl + 'questions/list/all/';
            const response = await axios.get(urlAll, {
                headers: {
                    Authorization: `Bearer ${token}` // Agrega el token en los headers
                }
            });
            setQuestions(response.data);
            setStatus(true);
            setAlert(true);
            setAlertMsg('Cambio exitoso!');
            setTimeout(() => {
                setAlert(false);
                setAlertMsg('');
            }, 2000); // Desaparecer el mensaje después de 2 segundos
        } catch (error) {
            console.log(error.response.data);
        }
    };
    const cargarListadoAlternative = async (id) => {
        try {
            const url = ApiUrl + `${id}/`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}` // Agrega el token en los headers
                }
            });
            setAlternatives(response.data.answer);
            setShowPopup(true);
            setAlertMsg('Cambio exitoso!');
            setTimeout(() => {
                setAlert(false);
                setAlertMsg('');
            }, 2000); // Desaparecer el mensaje después de 2 segundos
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const [selectedAlternative, setSelectedAlternative] = useState(null);

    const handleSelectAlternative = (alternative) => {
        setSelectedAlternative(alternative);
        setForm({
            ...form,
            label: alternative.label,
            right: alternative.right,
        });
    };
    const FiltroSelect = (ensayo) => {

        return ensayo
    }
    const BusquedaNombre = () => {
        // si no han ingresado una busqueda, enviamos la lista completa.
        if (!search) {
            const datosHistorial = questions;
            const indexInicio = paginaActual * itemsPorPagina

            return datosHistorial.slice(indexInicio, indexInicio + itemsPorPagina)
        }
        // creamos una variable y pasamos la busqueda a minusculas


        const filtrado = questions.filter((ensayo) =>
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

    const handleUpdateAlternative = () => {
        if (selectedAlternative) {
          const alternativeForm = {
            id: selectedAlternative.id,
            label: form.label,
            right: form.right,
          };
          const url = `${Apiurl}answers/${alternativeForm.id}/`;
          axios.put(url, alternativeForm, {
            headers: {
              Authorization: `Bearer ${token}` // Agrega el token en los headers
            }
          })
            .then((response) => {
              console.log(response.data);
              // Realizar las acciones necesarias después de actualizar la alternativa
            })
            .catch((error) => {
              console.log(error.response.data);
            });
          cargarListadoAlternative(form.id);
        }
        cargarListadoAlternative(form.id);
      };
      
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
           
             return questions.length
        }

        const filtrado = questions.filter(ensayo => ensayo.id)
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
                                    <h3>Listado de Preguntas</h3>
                                    <div className=''>
                            <input
                                className="form-control  " 
                                type="search" placeholder="Buscar Pregunta"
                                aria-label="Search"
                                onChange={onSearchChange}
                            >
                            </input>
                            {BusquedaNombre().length === 0 && questions.length > 0 && (
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
                                            <th>Temario</th>
                                            <th>Enunciado</th>
                                            <th>Eliminado Logico</th>
                                   
                                            <th>Alternativas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {status === true && (
                                            BusquedaNombre().map((question, i) => (
                                                <tr key={i} onClick={() => handleClick(question.id, question.question, question.link_resolution)}>
                                                    <td>{question.id}</td>
                                                    <td>{question.subject}</td>

                                                    <td>
                                                        {replace((question.question).replace('Â', ''), ecuacionRegex, (match, i) => {
                                                            return <InlineMath key={i} math={match} />;
                                                        })}

                                                    </td>
                                                    <td>{question.is_deleted == false ? 'No':'Si'}</td>
                                                    {/* 
                                                    <td>
                                                        <a href={question.link_resolution} target="_blank" rel="noopener noreferrer">
                                                            URL
                                                        </a>
                                                    </td>
                                                    */}
                                                    <td style={{display:'grid',placeContent:'center'}}>
                                                        <i class='bx bx-list-plus' onClick={() => handleViewAlternatives(question.id)}></i>
                                                       
                                                    </td>
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
                            <h3>Modificar Pregunta</h3>
                            <i class='bx bx-filter'></i>
                  
                        </div>
                        <form className="form-horizontal" action="/action_page.php" onSubmit={manejadorSubmit}>
                        <div className="form-group">
                            <label className="control-label" htmlFor="email">ID de la Pregunta:</label>
                            <div className="">
                                <input type="search" name="id" className="form-control busqueda " id="email" onChange={manejadorChange} value={form.id} placeholder="Inserte ID" />
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label className="control-label " htmlFor="pwd">Enunciado de la Pregunta:</label>
                            <div className="">
                                <textarea name="question" className="form-control" id="pwd" onChange={manejadorChange} value={form.question} placeholder="Inserte Enunciado" />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label className="control-label " htmlFor="link_resolution">Enlace de video:</label>
                            <div className="">
                                <input type='search' name="link_resolution" className="form-control" id="link_resolution" onChange={manejadorChange} value={form.link_resolution} placeholder="Inserte Enunciado" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 ">
                                <button type="button" className="btn btn-dark mt-2" onClick={manejadorBoton}>Modificar</button>
                                <button type="button" className="btn btn-dark mt-2 ml-3" onClick={manejadorEliminar}>Eliminar</button>
                                <button type="button" className="btn btn-dark mt-2 ml-3" onClick={manejadorRecuperar}>Recuperar</button>
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
                                {errorLink === true && (
                                    <div className="alert alert-danger mt-4" role="alert">
                                        {errorLinkMsg}
                                    </div>
                                )}
                                {errorNotFound === true && (
                                    <div className="alert alert-danger mt-4" role="alert">
                                        {errorNotFoundMsg}
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

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Alternativas</h2>

                        <table className="table" style={{ backgroundColor: "white", width: "80%" }}>
                            <thead className="thead-dark">
                                <tr>
                                    <th>Id Alternativa</th>
                                    <th>Etiqueta</th>
                                    <th>Correcta</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alternatives.map((alternative, i) => (
                                    <tr
                                        key={i}
                                        onClick={() => handleSelectAlternative(alternative)}
                                        className={alternative === selectedAlternative ? "selected" : ""}
                                    >
                                        <td>{alternative.id}</td>
                                        <td>
                                            {replace((alternative.label).replace('Â', ''), ecuacionRegex, (match, i) => {
                                                return <InlineMath key={i} math={match} />;
                                            })}
                                        </td>
                                        <td className={alternative.right ? "true" : "false"}>{alternative.right ? "Verdadera" : "Falsa"}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>



                        <div className="alternative-form">

                            <label htmlFor="label">Etiqueta:</label>
                            <textarea
                                id="label"
                                value={form.label}
                                onChange={(e) => setForm({ ...form, label: e.target.value })}
                            />

                            <label htmlFor="right">Correcta:</label>
                            <select
                                className='form-select'
                                id="right"
                                value={form.right}
                                onChange={(e) => setForm({ ...form, right: e.target.value })}
                            >
                                <option value="1">Verdadera</option>
                                <option value="0">Falsa</option>
                            </select>

                            <div className="button-container">
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={handleUpdateAlternative}
                                >
                                    Modificar
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-dark"
                                    onClick={handleClosePopup}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            )}

        </React.Fragment>
    );
};

export default ChangeQuestions;