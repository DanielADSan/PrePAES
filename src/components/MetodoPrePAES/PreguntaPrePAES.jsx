import React from "react";
import { useState, useEffect } from "react";
import { InlineMath } from "react-katex";
import { useNavigate } from 'react-router-dom';
import replace from 'react-string-replace'; // Importa la biblioteca react-string-replace
import axios from "axios";
import { Apiurl } from "../../Services/apirest";
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
const PreguntaPrePAES = () => {

  const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  const ecuacionRegex = /\[(.*?)\]/g; // Expresión regular para detectar partes de la cadena que contienen ecuaciones

  const navigate = useNavigate();  // Get the navigate function
  const [question, setQuestion] = useState(null);
  const [sidebarActive, setSidebarActive] = useState(JSON.parse(localStorage.getItem("sidebarActive")) || false);
  const [showAnswer, setShowAnswer] = useState(false); // Estado que almacena si se muestra la respuesta o no
  const [blockAnswer, setBlockAnswer] = useState(false); // Estado que almacena si se muestra la respuesta o no
  const [selectedAnswers, setSelectedAnswers] = useState(
    JSON.parse(localStorage.getItem("selectedAnswers")) || {});
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

  return (
    <>
      <Sidebar sidebarActive={sidebarActive} ubicacionActual={"MetodoPrePAES"} />
      <div className="content">
        <Navbar toggleSidebar={toggleSidebar} />
        {question ? ( // Verificar si question no es null o undefined
          <div>


            <div className="contenedor-principal position-relative mt-4">

              <div className="contenedor-pregunta">

                <div className="row ">
                  <div className="col-md-1">
                    <h6 style={{ color: "rgb(78, 84, 87)" }}>
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
                      <iframe
                        className="video-respuesta"
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

          </div>
        ) : (
          <h1>gola</h1> // Muestra el componente Loading mientras se carga la pregunta
        )}
      </div>
    </>
  );
}
export default PreguntaPrePAES;
