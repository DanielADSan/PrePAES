import React from "react";
import '../../styles/crearEnsayo.css'
import FormContext from "../FormContext";
import { useState, useEffect } from "react";
import ListIcon from '@mui/icons-material/List';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom';
import { Apiurl } from "../../Services/apirest";
import axios from 'axios';
function CrearEnsayo() {
  const urlPost = Apiurl + `custom_essays/`;
  const UrlCreateEssayConfig = Apiurl + `essaysConfig/create/`;
  const navigate = useNavigate();  // Get the navigate function
    const [sidebarActive, setSidebarActive] = useState(JSON.parse(localStorage.getItem("sidebarActive")) || false);
    
    const toggleSidebar = () => {
        setSidebarActive(prevState => !prevState);
    };
    useEffect(() => {
        localStorage.setItem("sidebarActive", sidebarActive);
    }, [sidebarActive]);
  // guardara todas las preguntas y respuestas de los llamados a las bd.
  const [post, setPost] = React.useState([]);
  // el ensayoSelected sera solo el/los tema que fue seleccionado por el usuario.
  const [ensayoSelected, setensayoSelected] = React.useState({});
  const [ensayosArray, setEnsayosArray] = React.useState([])

  // esta constante sera solo para saber si elegio los temas y finalizar la funcion.
  const [showPopup, setShowPopup] = useState(false);
  const [nombreEnsayo, setnombreEnsayo] = React.useState("Ensayo Personalizado");
  const [cantidadPreguntas, setCantidadPreguntas] = React.useState('');
  const [formData, setFormData] = React.useState(JSON.parse(localStorage.getItem('formData'))||{});
  const [showMostrarData, setShowMostrarData] = React.useState(false);
  const [messageError, setMessageError] = React.useState('');


  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
    console.log(formData);
  },[formData]);
  if (!post) return null;


  function validarNombreEnsayo() {
    const nombre = nombreEnsayo.trim(); // Obtiene el valor y elimina espacios en blanco al principio y al final
  
    const patron = /^[a-zA-Z0-9 -]{10,20}$/;// Expresión para validar el nombre, que sea solo caracteres y de largo entre 10 y 20
  
    if (!patron.test(nombre)) {
      return false; // El nombre no cumple con los requisitos
    }
    return true; // El nombre cumple con los requisitos
  }
  
  function handleCheckBoxChange(e) {
    //declaramos una constante objecto que contenga la id y checked del evento.
    // {id , checked,name} va a extraer la informacion del evento.target que seria el checkbox.
    
    const { id, checked, name } = e.target;

    // seteamos los datos en el ensayoSelected.
    setensayoSelected((current) => ({
      ...current,
      [id]: { id, name, checked },
    }));
  }
  const handleCantidadPreguntasChange = (e) => {
    setCantidadPreguntas(e.target.value);
    console.log(cantidadPreguntas);
     // Clear the selection of the other options
     const checkboxes = document.querySelectorAll('.cantidadPreguntasInput');
     checkboxes.forEach((checkbox) => {
       if (checkbox.id !== e.target.id) {
         checkbox.checked = false;
       }
     });
  } 
  async function saveEssayCustom (nombreEnsayo, ensayoSelected) {
    if (!validarNombreEnsayo()) {
      return;
    }
  
    if(cantidadPreguntas === ''){
      setMessageError('Debes seleccionar la cantidad de preguntas');
      return;
    }
    if(ensayosArray.length <2){
      setMessageError('Debes seleccionar al menos dos temas');
      return;
    }
    if(nombreEnsayo === ''){
      setMessageError('Debes ingresar un nombre para el ensayo');
      return;
    }
    const userId = parseInt(localStorage.getItem("user_id"));
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(UrlCreateEssayConfig, {
        type_math_ids: ensayosArray,
        users: userId,
        name: nombreEnsayo,
        questionNumber: cantidadPreguntas
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.setItem("essayTemario", nombreEnsayo);
      navigate('../Ensayos')
     
    } catch (error) {
      setMessageError(error.response.data.message[0]);
      console.log(error.response.data.message[0]);
    }
  };
  useEffect(() => {
    const updatedEnsayosArray = [];
    for (let i in ensayoSelected) {
        if (ensayoSelected[i].checked === true)
            updatedEnsayosArray.push(ensayoSelected[i].id);
    }
    setEnsayosArray(updatedEnsayosArray);
}, [ensayoSelected]);
  const mostrarData = () => {
   
    let seleccionados = 0;
  
    for (let i in ensayoSelected) {
      if (ensayoSelected[i].checked === true) {
        seleccionados++;
      }
    }
  
    if (cantidadPreguntas && seleccionados > 1) {
      // Actualizar el estado de formData
      setFormData({ cantidadPreguntas, ensayosArray });
      localStorage.removeItem('ensayo');
      setShowMostrarData(true);
    } else {
      alert("Debes seleccionar al menos dos tipos de ensayo, su tiempo y preguntas.");
    }
  };
  //setiamos los id de los ensayos
  
  useEffect(() => {
    // Verificar si la información ya está guardada en el almacenamiento local
    const formDataa = JSON.parse(localStorage.getItem('formData'));
  
    if (formDataa && formDataa.cantidadPreguntas && showMostrarData) {
      // La información ya está disponible, redirigir a la URL deseada
      const essayId = parseInt(localStorage.getItem("user_id"));
      const token = localStorage.getItem("token");
      axios.post(urlPost, {
        is_custom: true,
        user: essayId,
        name: nombreEnsayo,
        type_math_ids: ensayosArray,
        current_questions: JSON.parse(localStorage.getItem('formData')).cantidadPreguntas
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        localStorage.setItem('new_id', response.data.id);
        localStorage.setItem('dataReady', 'true');
        localStorage.setItem('ensayoArray',ensayosArray)
        navigate(`/CrearEnsayoTest/${nombreEnsayo}/${response.data.id}`);
      })
      .catch(error => {
        console.log(error);
      });
      
    } else {
      // La información aún no está disponible, establecer una bandera y esperar
      localStorage.setItem('dataReady', 'false');
    }
  }, [formData]); // Este efecto se ejecutará cada vez que formData cambie
  
  return (
    <FormContext.Provider value={formData}>
    <Sidebar sidebarActive={sidebarActive} ubicacionActual={"Crear ensayo"} />
    <div className="content" >
    <Navbar toggleSidebar={toggleSidebar} />
    <main>
    <div className="header">
                        <div className="left">
                            <h1>Crear Ensayo</h1>
                        </div>
                        </div>

    <>
    
      
      
     
        <div className="contenedorProgresoCrearEnsayo">
          
          <div className="contenedorFormulario">
          <div className="row" >
          
            <div className="col " style={{borderRightStyle:"dashed", borderRightWidth:"1px", borderRightColor:"#a7a7a7"}}>
              <p className="sub-title">Configurar</p>
              <div className="d-flex justify-content-center flex-column align-items-center text-align-start">
              
                  <div className="cantidadPreguntas-container">
                    <p><ArrowForwardIcon className="arrow-forward-icon"/>Cantidad de preguntas y tiempo</p>
                  <div className="formCheck">
                    <div className="checkbox-container">
                      <input
                        className="form-check-input cantidadPreguntasInput"
                        type="radio"
                        id="36"
                        onChange={handleCantidadPreguntasChange}
                        name="36preguntas"
                        value={"36"}
                      ></input>
                      <label className="form-check-label" htmlFor="36">
                      <ListIcon style={{color:"#a7a7a7", marginLeft:"10px", width:"30px", height:"30px", display:"flex",alignSelf:"center"}}/>
                      <div className="cantidadPreguntas">
                        
                        <label className="form-check-label" htmlFor="36">
                          36</label>
                          <label className="form-check-label" htmlFor="36">
                          Preguntas</label>
                      </div>
                      <div className="separator"></div>
                      <AccessTimeIcon style={{color:"#a7a7a7", marginLeft:"10px", width:"30px", height:"30px",display:"flex",alignSelf:"center"}}/>
                      <div className="cantidadPreguntas">
                        
                        <label className="form-check-label" htmlFor="36">
                          72</label>
                          <label className="form-check-label" htmlFor="36">
                          Minutos</label>
                      </div>
                      </label>
                    </div>

                    <div className="checkbox-container">
                      <input
                        className="form-check-input cantidadPreguntasInput"
                        type="radio"
                        id="24"
                        onChange={handleCantidadPreguntasChange}
                        name="24preguntas"
                        value={"24"}
                      ></input>
                      <label className="form-check-label" htmlFor="24">
                      <ListIcon style={{color:"#a7a7a7", marginLeft:"10px", width:"30px", height:"30px", display:"flex",alignSelf:"center"}}/>
                      <div className="cantidadPreguntas">
                        
                        <label className="form-check-label" htmlFor="24">
                          24</label>
                          <label className="form-check-label" htmlFor="24">
                          Preguntas</label>
                      </div>
                      <div className="separator"></div>
                      <AccessTimeIcon style={{color:"#a7a7a7", marginLeft:"10px", width:"30px", height:"30px",display:"flex",alignSelf:"center"}}/>
                      <div className="cantidadPreguntas">
                        
                        <label className="form-check-label" htmlFor="24">
                          48</label>
                          <label className="form-check-label" htmlFor="24">
                          Minutos</label>
                      </div>
                      </label>
                    </div>
                    <div className="checkbox-container">
                      <input
                        className="form-check-input cantidadPreguntasInput"
                        type="radio"
                        id="12"
                        onChange={handleCantidadPreguntasChange}
                        name="12preguntas"
                        value={"12"}
                      ></input>
                      <label className="form-check-label" htmlFor="12">
                      <ListIcon style={{color:"#a7a7a7", marginLeft:"10px", width:"30px", height:"30px", display:"flex",alignSelf:"center"}}/>
                      <div className="cantidadPreguntas">
                        
                        <label className="form-check-label" htmlFor="12">
                          12</label>
                          <label className="form-check-label" htmlFor="12">
                          Preguntas</label>
                      </div>
                      <div className="separator"></div>
                      <AccessTimeIcon style={{color:"#a7a7a7", marginLeft:"10px", width:"30px", height:"30px",display:"flex",alignSelf:"center"}}/>
                      <div className="cantidadPreguntas">
                        
                        <label className="form-check-label" htmlFor="12">
                          24</label>
                          <label className="form-check-label" htmlFor="12">
                          Minutos</label>
                      </div>
                      </label>
                      
                    </div>
              
                    
                    
                  </div>
                  
                {/* <div className="formulario1">

                        <form className="form">
                            <p htmlFor="nombreEnsayo" className="mt-2">
                                Nombre del ensayo
                            </p>
                            <input
                                className={`form-control ${ inputFocus && !validarNombreEnsayo() ? 'is-invalid' : ''} ${validarNombreEnsayo() && inputFocus ? 'is-valid' : ''}`}
                                id="nombreEnsayo"
                                onChange={(e) => setnombreEnsayo(e.target.value)}
                                onFocus={() => setinputFocus(true)}
                            ></input>
                            { !validarNombreEnsayo() && inputFocus && (
                            <div className="invalid-feedback d-block">
                              El nombre del ensayo debe tener entre 10 y 20 caracteres y solo puede contener letras, espacios y guiones.
                              </div>)}
                                  
                        </form>
                  </div> */}
                  
                  </div>
                  
              </div>                
              </div>
              
             <div className="col ">   
              <p className="sub-title">Personalizar</p>
              <div className="d-flex justify-content-center flex-column align-items-center">               
                <div className="Contenedor1">
                  <p><ArrowForwardIcon className="arrow-forward-icon"/>Elige eje PAES</p>
                  <div className="formCheck">
                    <div className="checkbox-container checkbox-categoria">
                      <input
                        className="form-check-input categoria"
                        type="checkbox"
                        id="2"
                        onChange={handleCheckBoxChange}
                        name="numeros"
                        value={"Numeros"}
                      ></input>
                      <label className="form-check-label" htmlFor="2">
                        Números
                      </label>
                    </div>
                    <div className="checkbox-container checkbox-categoria">
                      <input
                        className="form-check-input categoria"
                        type="checkbox"
                        id="1"
                        onChange={handleCheckBoxChange}
                        name="algebra"
                        value={"Algebra"}
                      ></input>
                      <label className="form-check-label" htmlFor="1">
                        Álgebra y funciones
                      </label>
                    </div>
                    <div className="checkbox-container checkbox-categoria d-f">
                      <input
                        className="form-check-input categoria"
                        type="checkbox"
                        id="4"
                        onChange={handleCheckBoxChange}
                        name="geometria"
                        value={"Geometria"}
                      
                      ></input>
                      <label className="form-check-label" htmlFor="4">
                        Geometría
                      </label>
                    </div>
                    <div className="checkbox-container checkbox-categoria">
                      <input
                        className="form-check-input categoria"
                        type="checkbox"
                        id="3"
                        onChange={handleCheckBoxChange}
                        name="probabilidades"
                        value={"Probabilidades"}
                      ></input>
                      <label className="form-check-label" htmlFor="3">
                        Probabilidades y Estadística
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>    
                           
                        
              
              

             
          </div>
          <div className="row d-flex align-items-end justify-content-end mr-2">
            <button className="btn-accion m-1 " onClick={mostrarData} style={{width:"20%", height:"50px"}}> 
                      Realizar
            </button>  
            <button className="btn-accion m-1 " style={{width:"20%", height:"50px"}} onClick={()=>{setShowPopup(!showPopup);}}> 
                      Guardar Configuración
            </button> 
          </div> 
          {showPopup && (
              <div className="popup">
                 
                <div className="popup-content">
                <div className="popup-header">
                  <i class='bx bx-x exitPopup' onClick={()=>{setShowPopup(false)}}></i>
                </div> 
                  <h1>¿Quieres guardar esta configuración?</h1>
                  <p className="mt-4">Crearemos un atajo para que puedas realizar un ensayo con esta misma configuracción en el apartado de <b>Ensayos</b>.</p>
                    <div className="formulario1 mt-4">

                        <form className="form-guardar-ensayo">
                            <p htmlFor="nombreEnsayo" >
                                Nombre del ensayo:
                            </p>
                            <div style={{width:'70%',marginLeft:'.5rem', display:'flex', alignContent:'center',flexDirection:'column'}}>
                            <input
                                className={`form-control input-guardar-ensayo${  !validarNombreEnsayo() ? 'is-invalid' : ''} ${validarNombreEnsayo() ? 'is-valid' : ''}`}
                                id="nombreEnsayo"
                                onChange={(e) => setnombreEnsayo(e.target.value)}
                                placeholder="Ej: Números y Algebra"
                                
                            ></input>
                            {messageError.length !=0 &&(
                              <div className="invalid-feedback d-block mt-2">
                               <h5>{messageError}</h5>
                              </div>
                            )}
                            { !validarNombreEnsayo() &&  (
                            <div className="invalid-feedback d-block">
                              El nombre del ensayo debe tener entre 10 y 20 caracteres y solo puede contener letras, espacios y guiones.
                              </div>)}
                              </div>
                                  
                        </form>
                  </div> 
                  <button className="btn btn-outline-dark btn-lg mt-4" onClick={() =>saveEssayCustom(nombreEnsayo, ensayoSelected)}>Guardar Ensayo</button>
                </div>
              </div>
            )} 
        </div>
      </div>
       
        
   
        

    </>
    </main>
    </div>
    </FormContext.Provider>
  );
}

export default CrearEnsayo;