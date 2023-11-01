import React from "react";
import { useState, useEffect } from "react";
import { InlineMath } from "react-katex";
import { useNavigate } from 'react-router-dom';
import replace from 'react-string-replace'; // Importa la biblioteca react-string-replace
import axios from "axios";
import { Apiurl } from "../../Services/apirest";
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import { corregirOrtografia } from "../../helper/Ortografía";

const PreguntaPrePAES = () => {
  const urlSubmitErrors = Apiurl + "questions_error/";
  const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  const ecuacionRegex = /\[(.*?)\]/g; // Expresión regular para detectar partes de la cadena que contienen ecuaciones
  const number_phase = localStorage.getItem("numeroFase");
  const navigate = useNavigate();  // Get the navigate function
  const [showSolucion, setShowSolucion] = useState(false);
  const [question, setQuestion] = useState(null);
  const [sidebarActive, setSidebarActive] = useState(JSON.parse(localStorage.getItem("sidebarActive")) || false);
  const [showAnswer, setShowAnswer] = useState(false); // Estado que almacena si se muestra la respuesta o no
  const [blockAnswer, setBlockAnswer] = useState(false);
  const [questionError, setQuestionError] = useState('');
  const [formDataError, setFormDataError] = useState({
    type_error: '',
    message: '',
    question: questionError,
  }); // Estado que almacena si se muestra la respuesta o no
  const [selectedAnswers, setSelectedAnswers] = useState(
    JSON.parse(localStorage.getItem("selectedAnswers")) || {});
  const [showFormError, setShowFormError] = useState(false);
  const toggleSidebar = () => {
    setSidebarActive(prevState => !prevState);
  };
  useEffect(() => {
    localStorage.setItem("sidebarActive", sidebarActive);
  }, [sidebarActive]);
  useEffect(() => {
    setQuestion(JSON.parse(localStorage.getItem("questionPrePAES")));
    console.log(question)
  }, []);

  useEffect(() => {
    if(localStorage.getItem("stateAnswerPrePAES") === 'true'){
      setShowAnswer(true);
      setBlockAnswer(true);
    };
  },[])
  useEffect(() => {
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);
  const sendAnswer = async () => {
    const token = localStorage.getItem("token");
    const apiUrlSendAnswer = Apiurl + "PrePAES_submit_answers/";
    const response = await axios.post(apiUrlSendAnswer, {
      answer_id: selectedAnswers,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { data } = response;
    setBlockAnswer(true);
    setShowAnswer(true);
    console.log(data)

    const response2 = await axios.post(Apiurl + "submit_answer_state/", {
      answer_id: selectedAnswers,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response2.data)
  };
  const seleccionarAlternativa = (id) => {
    if (!blockAnswer) {
      setSelectedAnswers(id);
    }
  };
  const saveQuestionError = (idQuestion) => {
    console.log(idQuestion)
    setQuestionError(question.id);
    console.log(formDataError)
    setShowFormError(true);

  }

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormDataError((current) => ({
      ...current,
      [id]: value,
      question: questionError
    }));
    console.log(formDataError)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar acciones con los datos guardados en formData
    const token = localStorage.getItem("token");
    console.log(formDataError);
    if (formDataError.type_error === '' || !formDataError?.message || formDataError === '') {
      alert('Debe llenar todos los campos')
    } else {
      axios.post(urlSubmitErrors, formDataError, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          console.log(response.data);
          alert('Su reporte ha sido enviado con éxito')
          setShowFormError(false);
          setFormDataError({
            type_error: '',
            message: '',
            question: '',
          })
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Sidebar sidebarActive={sidebarActive} ubicacionActual={"MetodoPrePAES"} />
      <div className="content">
        <Navbar toggleSidebar={toggleSidebar} />
        {question ? ( // Verificar si question no es null o undefined
          <div>


            <div className="contenedor-principal position-relative mt-4">
              <h3  className="titleEnsayo">Fase {number_phase}</h3>
              <div className="contenedor-pregunta">

                <div className="row ">
            <div className="col-md-11 mt-3">
              <h3 style={{color:'var(--dark)'}}>
                {corregirOrtografia(question.subject)}
              </h3>
            </div>
            <div className="col-md-1">
              <h6 style={{color:"rgb(78, 84, 87)"}}>
                #{question.id}
              </h6>
            </div>
            
           
          </div>



                <h3 className="enunciado-pregunta  ">
                  <div>
                    {
                      replace(
                        replace(question.question, ecuacionRegex, (match, i) => {
                          return <InlineMath key={i} math={match} />;
                        }),
                        regex,
                        (match, i) => {
                          return (
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                              <img key={i} src={match} alt="Imagen" className='img_question' />
                            </div>);
                        }
                      )
                    }

                  </div>
                </h3>
                
                {!showAnswer ? (
                  <>
                  {question.answer.map((respuesta, idk) => (
                  <button
                    type="button"
                    className={`contenedor-alternativa-pregunta ${respuesta.id === selectedAnswers ? 'selected' : ''}`}
                    onClick={() => seleccionarAlternativa(respuesta.id)}

                    key={respuesta.id}

                  >
                    <b>{String.fromCharCode(65 + idk) + " . "}</b>
                    {replace((respuesta.label).replace('Â', ''), ecuacionRegex, (match, i) => {
                      return <InlineMath key={i} math={match} />;
                    })}
                  </button>
                ))}
                    <div className="d-flex justify-content-center mt-4">

                      <button className="btn btn-outline-warning btn-lg " style={{ display: "flex", alignItems: 'center' }} onClick={() => sendAnswer()} >
                        Responder <i class='bx bx-send ml-2'></i>
                      </button>
                    </div>

                  </>
                ) : (
                  <>
                    {question.answer.map((respuesta, idk) => (
                  <button
                    type="button"
                    className={`contenedor-alternativa-pregunta ${
                      respuesta.id === selectedAnswers && respuesta.right === 0
                        ? 'selectedFalse'
                        : respuesta.right === 1
                        ? 'selectedTrue'
                        : ''
                    }`}
                    onClick={() => seleccionarAlternativa(respuesta.id)}

                    key={respuesta.id}

                  >
                    <b>{String.fromCharCode(65 + idk) + " . "}</b>
                    {replace((respuesta.label).replace('Â', ''), ecuacionRegex, (match, i) => {
                      return <InlineMath key={i} math={match} />;
                    })}
                  </button>
                ))}
                <div className="mt-4">
                <div className="mt-4 mb-4" style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <button className=" btn btn-outline-dark btn-lg" onClick={() => { setShowSolucion(true) }}>Ver Solución</button>
                        <button className="btn btn-lg  btn-outline-warning "  onClick={() => { saveQuestionError(question.id) }} style={{ alignSelf: 'end', display:'flex', alignItems:'center', gap:'.5rem' }}><i class='bx bx-error'></i> Reportar</button>
                      </div>

                      <iframe
                        className={`video-respuesta mt-3 ${showSolucion ? "show" : ""}`}
                        id="video03"
                        width="560"
                        height="315"
                        src={question.link_resolution}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="d-flex justify-content-center mt-4">

                      <button className="btn btn-outline-warning btn-lg " style={{ display: "flex", alignItems: 'center' }} onClick={() => navigate('/MetodoPrePAES')} >
                        Continuar <i class='bx bx-send ml-2'></i>
                      </button>
                    </div>
                  </>
                    )}


              </div>



            </div>
            {showFormError && (
          <div className="popup">

            <div className="popup-content" style={{width:'600px'}}>
              <div className="popup-header">
              <i class='bx bx-x exitPopup' onClick={() => {
                  setShowFormError(false), setFormDataError({
                    type_error: '',
                    message: '',
                    question: questionError,
                  })
                }}></i>
              </div>
              

              <form action="" style={{ display: 'flex', flexDirection: 'column', textAlign: 'start', width: '100%' }} onSubmit={handleSubmit}>
                <div class="form-group ">
                  <h2 className="mb-4">Reportar Pregunta</h2>
                  <label style={{ fontWeight: 'bold' }} for="errorType">Tipo de Error</label>
                  <select
                    className="form-control"
                    id="type_error"
                    value={formDataError.type_error}
                    onChange={handleInputChange}
                  >
                    <option>Seleccione una opción</option>
                    <option>Ortografía de la Pregunta</option>
                    <option>Solución Erronea</option>
                    <option>Video Caído</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div class="form-group">
                  <label style={{ fontWeight: 'bold' }} for="errorDescription">Detalle</label>
                  <textarea
                    class="form-control"
                    rows="5"
                    id="message"
                    value={formDataError.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-dark btn-lg m-2">Enviar</button>
              </form>
            </div>
          </div>
        )}
          </div>
        ) : (
          <h1>gola</h1> // Muestra el componente Loading mientras se carga la pregunta
        )}
      </div>
    </>
  );
}
export default PreguntaPrePAES;
