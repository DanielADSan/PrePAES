import React from 'react'
import { useState, useEffect } from 'react';
import { InlineMath } from "react-katex";
import replace from 'react-string-replace'; // Importa la biblioteca react-string-replace
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import axios from 'axios';
import { Typography } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { red, green } from "@mui/material/colors";
import { Apiurl } from '../../../Services/apirest';


function VerDatosHistorial({ setVerMasConfirmado, datosEnsayo }) {

  
  const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [showSolucion, setShowSolucion] = useState(false);
  const [showFormError, setShowFormError] = useState(false);
  const [questionError, setQuestionError] = useState('');
  const ecuacionRegex = /\[(.*?)\]/g; // Expresión regular para detectar partes de la cadena que contienen ecuaciones
  const [response, setResponse] = React.useState({});
  const [ensayo, setEnsayo] = React.useState([]);
  const [answered, setAnswered] = React.useState();
  const [tituloPregunta, setTituloPregunta] = React.useState([]);
  const urlSubmitErrors = Apiurl + "questions_error/";
  const [formDataError, setFormDataError] = useState({
    type_error: '',
    message: '',
    question: questionError,
  });
  const preguntaCorrectaOrNot = (qna, j) => {
    if (qna.question === tituloPregunta[j]) {
      return { sx: { color: green[500] } };
    } else {
      return { sx: { color: red[500] } };
    }
  };



  const markCorrectOrNot = (qna, idx, j) => {

    if (qna.answer[idx].right === 1) {

      return { sx: { color: green[500] } };
    } else {
      if (qna.answer[idx].answer_id === answered[j]) {
        return { sx: { color: red[500] } };
      }
    }
  };

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

  const saveQuestionError = (idQuestion) => {
    console.log(idQuestion)
    setQuestionError(idQuestion);
    console.log(formDataError)
    setShowFormError(true);

  }


  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(Apiurl + "custom_essay_view/" + datosEnsayo.id + "/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const datosEnsayo = Object.values(res.data);
        setResponse(res.data);
        console.log(res.data)
        setEnsayo(res.data.question)
        setAnswered(res.data.answered)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const newTituloPregunta = [];
    ensayo.forEach((item, j) => {
      item.answer.forEach((respuesta, i) => {
        if (respuesta.right === 1 && respuesta.answer_id === answered[j]) {
          newTituloPregunta[j] = item.question;
        }
      });
    });
    setTituloPregunta(newTituloPregunta);
    console.log(tituloPregunta)
  }, [ensayo, answered]);


  return (
    <div>

      <div className="resultado">
        <div
          className="mask-resultado" /*style="background-color: rgba(0, 0, 0, 0.8);border-radius:7px;"*/
        >
          <div className="d-flex  align-items-center h-100 ">
            <div className="text-white  p-3 w-100">

              <h1 className="mb-3 text-success " style={{ fontSize: "1.8rem" }}><PlaylistAddCheckIcon style={{ color: "green", fontSize: "3rem" }} /> Obtuviste {response.score} puntos</h1>

              <ul className="list-answers">
                <li>
                  <p>Nombre Ensayo {response.name}</p>
                </li>
                <li>
                  <p>Realizado el {datosEnsayo.date}</p>
                </li>

                <li>

                  <p >{response.current_questions} ejercicios en total</p>
                </li>

              </ul>
              <div className="d-flex justify-content-end widht-100 ">
                <button
                  onClick={() => setVerMasConfirmado(false)}
                  type="button"
                  className="btn btn-outline-dark btn-lg m-2"
                  id="bot"
                >
                  Regresar
                </button>



              </div>
            </div>

          </div>

        </div>

        <div className="accordion mt-4" id="accordionExample">
          <div>
            {ensayo.map((item, j) => (
              <Accordion
                disableGutters
                key={j}
                expanded={expanded === j}
                onChange={handleChange(j)}
                className='accordion-item'
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandCircleDownIcon
                      {...preguntaCorrectaOrNot(item, j)}
                    />
                  }
                >
                  <Typography>
                    {j + 1}. {
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
                    width="560"
                    height="315"
                    src={item.link}
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
}

export default VerDatosHistorial