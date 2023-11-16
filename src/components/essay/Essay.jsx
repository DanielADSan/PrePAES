import React from "react";
import { useState, useEffect, useRef } from "react";
import "katex/dist/katex.min.css";
import Box from "@mui/material/Box";
import { red, green } from "@mui/material/colors";
import { getFormatedTime } from "../../helper";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import $ from "jquery";
import { InlineMath } from "react-katex";
import replace from 'react-string-replace'; // Importa la biblioteca react-string-replace
import AccessTimeIcon from '@mui/icons-material/AccessTimeFilled';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';
import { Apiurl } from "../../Services/apirest";
import '../../styles/essay.css'
import { useNavigate } from 'react-router-dom';

const UrlSubmitAnswers = Apiurl + "submit_answers/";
const urlSubmitQuestions = Apiurl + "submit_questions/";
const urlSubmitErrors = Apiurl + "questions_error/";

function Essay(props) {
  const [showSolucion, setShowSolucion] = useState(false);
  const navigationContainerRef = useRef(null);
  const navigate = useNavigate();  // Get the navigate function
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const markCorrectOrNot = (qna, idx, j) => {
    if (qna.answer[idx].right === 1) {
      return { sx: { color: green[500] } };
    } else {
      if (qna.answer[idx].label === respuestaaa[j]) {
        return { sx: { color: red[500] } };
      }
    }
  };

  const preguntaCorrectaOrNot = (qna, j) => {
    if (qna.question === tituloPregunta[j]) {
      return { sx: { color: green[500] } };
    } else {
      return { sx: { color: red[500] } };
    }
  };
  let largo = props.ensayo.length - 1;
  const navigationItems = [...Array(30).keys()];

  const [preguntaActual, setPreguntaActual] = useState(
    parseInt(localStorage.getItem("preguntaActual")) || 0);
  const [puntuación, setPuntuacion] = useState(
    JSON.parse(localStorage.getItem("puntuacion")) || ""
  );
  const [isFinished, setIsFinished] = useState( JSON.parse(localStorage.getItem('isFinished'))||false);
  const [ensayo, setEnsayo] = useState(
    JSON.parse(localStorage.getItem("ensayo")) || props.ensayo
  );
  const [tiempoRestante, setTiempoRestante] = useState(
    parseInt(localStorage.getItem("tiempoRestante")) ||
    props.ensayo.length * 60 * 2
  );
  const [areDisabled, setAreDisabled] = useState(false);
  const [new_id, setNew_id] = useState(JSON.parse(localStorage.getItem("new_id")) || []);
  const [fechaActual, setFechaActual] = useState("")
  const [selectedAnswers, setSelectedAnswers] = useState(
    JSON.parse(localStorage.getItem("selectedAnswers")) || {});

  const textoDesdeDB = "Cuanto es [\\frac{1}{2}], y ademas [\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}\]";
  const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  const ecuacionRegex = /\[(.*?)\]/g; // Expresión regular para detectar partes de la cadena que contienen ecuaciones
  const [tiempoUsuario, setTiempoUsuario] = useState(0);
  const flagTimeOut2 = useRef(true);
  const [isFinishedTimeOut, setIsFinishedTimeOut] = useState(false);
  const [flagTimeOut, setFlagTimeOut] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showFormError, setShowFormError] = useState(false);
  const [questionError, setQuestionError] = useState('');
  const [questionsId, setQuestionsId] = useState( JSON.parse(localStorage.getItem('questionsId')) ||
    props.ensayo.map((item) => item.id)
  );
  const [formDataError, setFormDataError] = useState({
    type_error: '',
    message: '',
    question: questionError,
  });//[
  const [respuestaId, setRespuestaId] = useState(
    JSON.parse(localStorage.getItem('respuestaId')) ||[]);
  const [respuestaaa, setRespuesta] = useState(
    JSON.parse(localStorage.getItem("respuesta")) || []);

  const [tituloPregunta, setTituloPregunta] = useState(
    JSON.parse(localStorage.getItem("tituloPregunta")) || []);


  const [isHidden, setIsHidden] = useState(false);
  const a = 16.67;
  const b = 100;

  const calcularPuntaje = (numPreguntas, numRespuestasCorrectas) => {
    const puntaje = 100 + (900 / numPreguntas) * numRespuestasCorrectas;
    return Math.round(puntaje);
  };
  function handleClick() {



    setIsHidden(!isHidden);
  };

  let timer;
  function reiniciarTiempo() {
    let tiempoInicial = props.ensayo.length * 60 * 2
    setTiempoRestante(tiempoInicial);
    localStorage.setItem("tiempoRestante", tiempoInicial.toString());
  }
  useEffect(() => {
    timer = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante <= 60) $(".tiempo").addClass("text-danger");
      if (tiempoRestante === 0) {
        setAreDisabled(true);
        setIsFinished(true);
        setIsFinishedTimeOut(true)
      }
    }, [1000]);

    return () => clearInterval(timer);
  }, [tiempoRestante]);
  const url = window.location.pathname; // Obtiene la parte de la URL que sigue después del nombre del servidor y el puerto
  const pruebaName = url.split("/").pop(); // Obtiene la última parte de la URL después de la barra ("/")
  if (pruebaName !== localStorage.getItem("ensayoActivo"))
    localStorage.setItem("tiempoRestante", 0);
  localStorage.setItem("ensayoActivo", pruebaName);
  useEffect(() => {
    localStorage.setItem("tituloPregunta", JSON.stringify(tituloPregunta));
  }, [tituloPregunta]);

  useEffect(() => {
    localStorage.setItem('questionsId', JSON.stringify(questionsId));
  }, [questionsId]);

  useEffect(() => {
    localStorage.setItem('respuestaId', JSON.stringify(respuestaId));
  }, [respuestaId]);
  useEffect(() => {
    localStorage.setItem("respuesta", JSON.stringify(respuestaaa));
  }, [respuestaaa]);
  useEffect(() => {
    localStorage.setItem("isFinished", JSON.stringify(isFinished));
  }, [isFinished]);
  useEffect(() => {
    localStorage.setItem("tiempoRestante", tiempoRestante.toString());
  }, [tiempoRestante]);
  useEffect(() => {
    localStorage.setItem("preguntaActual", preguntaActual.toString());
  }, [preguntaActual]);
  useEffect(() => {
    localStorage.setItem("ensayo", JSON.stringify(ensayo));
  }, [ensayo]);
  useEffect(() => {
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);
  useEffect(() => {
    localStorage.setItem("puntuacion", JSON.stringify(puntuación));
  }, [puntuación]);
  useEffect(() => {
    const fecha = new Date();
    setFechaActual(fecha.toLocaleDateString());
  }, []);

  useEffect(() => {
    console.log('estas son los id de las preguntas: '+localStorage.getItem('questionsId'))
    console.log('estas son las respuestas: '+respuestaId)
    
  }, [respuestaId]);
  function handleAnswerSubmit(isCorrect, e, res, id, tituloP) {  // FUNCION AL MARCAR ALTERNATIVA 
    setRespuesta((current) => {
      const newRespuestas = [...current];
      newRespuestas[preguntaActual] = res;
      return newRespuestas;
    });

    //actualiza el estado del componente agregando un nuevo valor (res) al final de un array (current) existente.
    setRespuestaId((current) => {
      const newRespuestasId = [...current];
      newRespuestasId[preguntaActual] = id;
      return newRespuestasId;
    });
    console.log(respuestaId)
    console.log(respuestaaa)
    setTituloPregunta((current) => {
      const newTitulos = [...current];
      newTitulos[preguntaActual] = isCorrect === 1 ? tituloP : "mala";
      return newTitulos;
    });

    setPuntuacion((current) => ({
      ...current,
      [preguntaActual]: isCorrect === 1 ? "Correcto" : "Incorrecta"
    }))

    //console.log(res);
    //  setPreguntaActual(preguntaActual + 1);

    // setAreDisabled(false);

  }

  async function finalizarEnsayo() {
      // Aquí va el código para manejar el envío del formulario cuando todas las preguntas han sido respondidas

      setTiempoUsuario(getFormatedTime(props.ensayo.length * 60 * 2 - tiempoRestante));

      let tiempoUser = props.ensayo.length * 60 * 2 - tiempoRestante;

      setIsFinished(true);

      console.log(new_id)

      const token = localStorage.getItem("token");
      const respuestas = respuestaId.filter(elemento => elemento !== null && elemento !== undefined);
      console.log(respuestaId)
      try {
        const response = await axios.post(UrlSubmitAnswers, {
          answer_ids: respuestas, // [16,11,null,7,3]
          user_essay_id: new_id,
          time_essay: tiempoUser.toString()


          //question_ids: preguntaId, [1,2,3,4,5]
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log(props.ensayo.length)
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.post(urlSubmitQuestions, {
          question_ids: questionsId, // [16,11,null,7,3]
          user_essay_id: new_id,
      
          //completa el codigo
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('se mando genial adsasda');
      } catch (error) {
        console.log(error);
      }

    
  }
  function handleClickNav(j) {
    setPreguntaActual(j);
    // Ajustar el scroll del contenedor
    if (navigationContainerRef.current) {
      const itemWidth = navigationContainerRef.current.querySelector('.navigation-item').offsetWidth;
      const scrollOffset = itemWidth * j;
      navigationContainerRef.current.scrollLeft = scrollOffset;
    }
  }

  let puntajeFinal = 0;
  let errores = 0;
  let puntajePAES = 0;
  // cuando la funcion terminar se ejecute que haga el conteo de la puntuacion.
  if (setIsFinished) {
    for (let puntaje in puntuación) {
      if (puntuación[puntaje] === 'Correcto') {
        puntajeFinal += 1;
      } else if (puntuación[puntaje] === 'Incorrecta') {
        errores += 1;
      }
    }
    puntajePAES = (puntajeFinal * 1000) / props.ensayo.length;

  }

  const saveQuestionError = (idQuestion) => {
    console.log(idQuestion)
    setQuestionError(idQuestion);
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
            question: questionError,
          })
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  function volverAlEnsayo() {
    setRespuesta((current) => {
      const newRespuestas = [...current];
      newRespuestas.pop(); // Eliminar la última respuesta del array
      return newRespuestas;
    });
    setTituloPregunta((current) => {
      const newTitulos = [...current];
      newTitulos.pop(); // Eliminar el último título de pregunta del array
      return newTitulos;
    });
    if (puntuación > 0) {
      setPuntuacion(puntuación - 1); // Disminuir la puntuación en 1 si es mayor a 0
      cookies.set("scoreNumeros", puntuación - 1, { path: "/" });
    }
    if (preguntaActual > 0) setPreguntaActual(preguntaActual - 1); // Disminuir el número de pregunta en 1
  }

  function retrocederPregunta() {


    if (puntuación > 0) {
      setPuntuacion(puntuación - 1); // Disminuir la puntuación en 1 si es mayor a 0
      cookies.set("scoreNumeros", puntuación - 1, { path: "/" });
    }
    if (preguntaActual > 0) setPreguntaActual(preguntaActual - 1); // Disminuir el número de pregunta en 1
  }

  function siguientePregunta() {
    if (preguntaActual < props.ensayo.length) {
      //setRespuesta((current) => [...current, "nada"]);
      setPreguntaActual(preguntaActual + 1); // Disminuir el número de pregunta en 1

      // setTituloPregunta((current) => [...current, "mala"]);
    }
  }

  async function finalizarEnsayoTimeOut() {
    // Aquí va el código para manejar el envío del formulario cuando todas las preguntas han sido respondidas

    if (flagTimeOut2.current == true) {
      setTiempoUsuario(getFormatedTime(props.ensayo.length * 60 * 2 - tiempoRestante));

      let tiempoUser = props.ensayo.length * 60 * 2 - tiempoRestante;

     
      setIsFinished(true);
      flagTimeOut2.current = false

      console.log(new_id)

      const token = localStorage.getItem("token");
      console.log(respuestaId)
      const respuestas = respuestaId.filter(elemento => elemento !== null && elemento !== undefined);
      console.log(respuestas)
      try {
        const response = await axios.post(UrlSubmitAnswers, {
          answer_ids: respuestas, // [16,11,null,7,3]
          user_essay_id: new_id,
          time_essay: tiempoUser.toString()


          //question_ids: preguntaId, [1,2,3,4,5]
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('guarde el ensayo');
        
        console.log(props.ensayo.length);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await axios.post(urlSubmitQuestions, {
          question_ids: questionsId, // [16,11,null,7,3]
          user_essay_id: new_id,
      
          //completa el codigo
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('se mando genial ');
      } catch (error) {
        console.log(error);
      }

    }
  }

  if (isFinishedTimeOut && flagTimeOut2){
      finalizarEnsayoTimeOut()
  }

  if (isFinished)
    return (
      <div>

        <main className="contenedor-principal min-vh-100">
          <div className="resultado">
            <div
              className="mask-resultado" /*style="background-color: rgba(0, 0, 0, 0.8);border-radius:7px;"*/
            >
              <div className="d-flex  align-items-center h-100 ">
                <div className=" p-3 w-100">

                  <h1 className="mb-3 text-success " style={{ fontSize: "1.8rem" }}><PlaylistAddCheckIcon style={{ color: "green", fontSize: "3rem" }} /> Obtuviste {calcularPuntaje(props.ensayo.length, puntajeFinal)} puntos</h1>

                  <ul className="list-answers">
                    <li>
                      <p>Realizado el {fechaActual}</p>
                    </li>
                    <li>
                      <p >{puntajeFinal} respuestas correctas</p>
                    </li>
                    <li>

                      <p >{props.ensayo.length} ejercicios en total</p>
                    </li>
                    <li>

                      <p>Tardaste {tiempoUsuario} en terminar el ensayo</p>
                    </li>
                  </ul>
                  <div className="d-flex justify-content-end widht-100 ">
                    <button
                      onClick={() => (navigate(`/Ensayos`), localStorage.removeItem("ensayo"), localStorage.removeItem("puntajeFinal"), localStorage.removeItem("puntuacion"), localStorage.removeItem("puntajeFinal"), localStorage.removeItem("puntajeFinal"), localStorage.removeItem("puntajeFinal"), localStorage.removeItem("puntajeFinal"), localStorage.removeItem("puntajeFinal"), localStorage.removeItem("selectedAnswers"), localStorage.removeItem("preguntaActual"), localStorage.removeItem("respuesta"), localStorage.removeItem("tituloPregunta"), localStorage.removeItem("tiempoRestante"),localStorage.removeItem("respuestaId"),localStorage.removeItem("new_id"),localStorage.removeItem("ensayoActivo"), localStorage.removeItem("questionsId"))}
                      type="button"
                      className="btn btn-outline-dark btn-lg m-2"
                      id="bot"
                    >
                      Continuar
                    </button>



                  </div>
                </div>
              </div>
            </div>
            <h5 className="mt-4" style={{color:'var(--dark)'}}>Selecciona la alternativa para acceder a la retroalimentación<i style={{padding:'.2rem', backgroundColor:'var(--warning2)',marginLeft:'5px',borderRadius:'50%', fontSize:'20px',color:'dark important!'}} class='bx bx-question-mark' ></i> </h5>
            <div className="accordion mt-4" id="accordionExample">
              <div className="acordion-result">
                {ensayo.map((item, j) => (
                  <Accordion
                    disableGutters
                    key={j}
                    expanded={expanded === j}
                    onChange={handleChange(j)}
                    className="accordion-item"

                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandCircleDownIcon
                          {...preguntaCorrectaOrNot(item, j)}
                        />
                      }
                      onClick={() => { setShowSolucion(false) }}
                    >
                      <Typography>
                        {j + 1}.
                        {
                          replace(
                            replace(item.question, ecuacionRegex, (match, i) => {
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
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {ensayo[j].answer.map((respuesta, i) => (
                        <Typography {...markCorrectOrNot(item, i, j)}>
                          <label
                            className="contenedor-alternativa-pregunta-respuesta "

                            key={respuesta.id}
                          >
                            <b>{String.fromCharCode(65 + i) + " . "}</b>
                            {replace((respuesta.label).replace('Â', ''), ecuacionRegex, (match, i) => {
                              return <InlineMath key={i} math={match} />;
                            })}
                          </label>
                        </Typography>
                      ))}
                      <div className="mt-4 mb-4" style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <button className=" btn btn-outline-dark btn-lg" onClick={() => { setShowSolucion(true) }}>Ver Solución</button>
                        <button className="btn btn-lg  btn-outline-warning" onClick={() => { saveQuestionError(item.id) }} style={{ alignSelf: 'end', display: 'flex', alignItems: 'center', gap: '.5rem' }}><i class='bx bx-error'></i> Reportar</button>
                      </div>

                      <section>
                        <iframe
                          className={`video-respuesta mt-3 ${showSolucion ? "show" : ""}`}
                          id="video03"

                          src={item.link_resolution}
                          title="YouTube video player"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </section>
                    </AccordionDetails>


                  </Accordion>
                ))}
              </div>
            </div>
          </div>

        </main>
        {showFormError && (
          <div className="popup">

            <div className="popup-content" style={{ width: '600px' }}>
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
    );

  return (
    <div>
      <div className="contenedor-principal position-relative ">
        <div className="row">
          <div className="col ">
            <h3 className="titleEnsayo">{props.titleEnsayo}</h3>
          </div>
          <div
            className={`timer-container col-3-md m-3  ${isHidden ? 'hide' : ''}`}
            onClick={handleClick}
          >
            {isHidden ? (
              <AccessTimeIcon fontSize="large" style={{ color: "white" }} />
            ) : (
              <h3 className="tiempo text-center mt-2">
                {getFormatedTime(tiempoRestante)}
              </h3>
            )}
          </div>
        </div>

        {preguntaActual < (props.ensayo.length) && (
          <div className="contenedor-pregunta">
            <div className="row ">
              <div className="col-md-11 mt-3">
                <h3 style={{ color: 'var(--dark)' }}>
                  Pregunta {preguntaActual + 1} de {props.ensayo.length}
                </h3>
              </div>
              <div className="col-md-1">
                <h6 style={{ color: "rgb(78, 84, 87)" }}>
                  #{ensayo[preguntaActual].id}
                </h6>
              </div>


            </div>


            <Box className="mt-3 mb-3">
              <LinearProgress
                variant="determinate"
                value={((preguntaActual + 1) * 100) / props.ensayo.length}
                color="warning"
                style={{
                  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)',
                }}
              />
            </Box>
            <h3 className="enunciado-pregunta  ">
              <div>
                {
                  replace(
                    replace(ensayo[preguntaActual].question, ecuacionRegex, (match, i) => {
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
            {ensayo[preguntaActual].answer.map((respuesta, idk) => (
              <button
                type="button"
                className={`contenedor-alternativa-pregunta ${respuesta.label === selectedAnswers[preguntaActual] ? 'selected' : ''}`}
                disabled={areDisabled}

                key={respuesta.id}
                onClick={(e) => {
                  setSelectedAnswers(prevAnswers => ({
                    ...prevAnswers,
                    [preguntaActual]: respuesta.label
                  }));

                  handleAnswerSubmit(
                    respuesta.right,
                    e,
                    respuesta.label,
                    respuesta.id,
                    ensayo[preguntaActual].question
                  );
                }}
              >
                <b>{String.fromCharCode(65 + idk) + " . "}</b>
                {replace((respuesta.label).replace('Â', ''), ecuacionRegex, (match, i) => {
                  return <InlineMath key={i} math={match} />;
                })}
              </button>
            ))}
            <div className="sumaResta">
              <a className="arrow left" onClick={retrocederPregunta}></a>
              <a className="arrow right" onClick={siguientePregunta}></a>



            </div>


          </div>


        )}
        {preguntaActual === props.ensayo.length && (
          <div className="contenedor-pregunta" >
            <h2 className="heroTerminar">¿Quiere terminar este ensayo?</h2>
            <div className="contenedor-preguntaVolverTerminar  ">
              <button onClick={volverAlEnsayo} className="btnVolverTerminar btn btn-lg btn-warning">No, quiero volver</button>
              <button onClick={finalizarEnsayo} className="btnVolverTerminar btn btn-lg btn-dark">Si, quiero terminar el ensayo</button>
            </div>
          </div>

        )}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h1 style={{ fontWeight: "bold" }}>Ups!! </h1>
              <p>Debe responder a todas las preguntas para terminar el ensayo.</p>
              <button className="btn btn-lg btn-warning" onClick={() => setShowPopup(false)}>Cerrar</button>
            </div>
          </div>
        )}
        <div className="navigation-container" ref={navigationContainerRef}>
          <div className="navigation-items">
            {ensayo.map((item, j) => (
              <div className={`navigation-item ${j === preguntaActual ? 'selected-nav' : ''} ${selectedAnswers[j] ? 'answered' : ''} `} key={j} onClick={() => handleClickNav(j)}>
                {j + 1}
              </div>
            ))}
            <div className={`navigation-item ${ensayo.length === preguntaActual ? 'selected-nav' : ''}`} onClick={() => setPreguntaActual(ensayo.length)} ><StarIcon className="starIcon" /></div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Essay;
