import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../../styles/LineaProgreso.css'
import CardLevel from './CardLevel';
import { Apiurl } from "../../Services/apirest"
import EnsayoPrePAES from './PreguntaPrePAES';
import { useNavigate } from 'react-router-dom';
import Flechafase from '../../icons/Flechafase';
import { motion } from "framer-motion"
import { parseJSON } from 'jquery';

const FaseEnsayo = () => {
  const navigate = useNavigate();  // Get the navigate function
  const token = localStorage.getItem("token");
  const ApiurlGetQuestion = Apiurl + "PrePAES_questions_state/";
  const apiUrlCreateEssay = Apiurl + "PrePAES/create/";
  const UrlGetOneQuestion = Apiurl + "question_oneQuestionRules_prePaes/";
  const urlGetDataQuestionPrePAES = Apiurl + "PrePAES_data_questions/";
  const [showLineaProgreso, setShowLineaProgreso] = useState(true);
  const [questionsState, setQuestionsState] = useState([]); // Estado que almacena las preguntas respondidas
  const [question, setQuestion] = useState(null);
  const [questionSinResponder, setQuestionSinResponder] = useState([]);
  const [numeroFase,setNumeroFase] = useState(parseInt(localStorage.getItem("numeroFase")) || 1);
  const [selectedButton, setSelectedButton] = useState('Fase');
    const handleButtonClick = (button) => {
        setSelectedButton(button);
    }
  const [error, setError] = useState(false);
  const hideLineaProgreso = () => {
    setShowLineaProgreso(false);
  };
  
  useEffect(() => {
    getQuestionsState(parseInt(localStorage.getItem("numeroFase")));
    
    navigate("/MetodoPrePAES");
    console.log(numeroFase)
  }, [numeroFase]);

  useEffect(() => {
    if(questionsState.length >= 10){  
      navigate("/MetodoPrePAES");
      console.log('CAMBIO DE FASE')
    }
  }, [questionsState.length>10]);
  const getQuestionsState = async (numberPhase) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(ApiurlGetQuestion + numberPhase, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      console.log(data);
      if (data && data[0] && data[0].user_PrePAES) {
        const preguntas = data[0].user_PrePAES;
        const preguntasConRespuesta = preguntas.filter((pregunta) =>
          pregunta.hasOwnProperty("answer_state")
        );
        console.log(preguntasConRespuesta);
        const preguntasSinResponder = preguntas.filter(
          (pregunta) => pregunta.answer_state === undefined
        );
        console.log("Pregunta sin responder", preguntasSinResponder);
        setQuestionsState(preguntasConRespuesta);
        setQuestionSinResponder(preguntasSinResponder);
        setNumeroFase(response.data[0].number_phase);
      } else {
        // En caso de que la respuesta no tenga el formato esperado      
        console.error("La respuesta no tiene el formato esperado.");
      }
    } catch (error) {
      // Manejo de errores: Puedes personalizar este bloque para manejar errores específicos.
      console.error("Error al obtener las preguntas:", error);
      setError(true);
      console.log(error)
    }
  };
  useEffect(() => {
    if(error === true){
      localStorage.setItem("numeroFase", 1);
      createEssay();
      setError(false);
      console.log('no lo puedo creer')
    }
  }, [error]);
  const createEssay = async () => {
    console.log(token)
    const response = await axios.post(apiUrlCreateEssay, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {   
      const faseActual = parseInt(localStorage.getItem("numeroFase"));
      localStorage.setItem("numeroFase", faseActual+1);   
      console.log('createessay')    
    }).catch((error) => {
      console.log(error)
    });   
  };
  useEffect(() => {
    console.log("Preguntas contestadas" + questionsState.length)
    if (questionsState.length >=10) {
      createEssay();     
      navigate("/MetodoPrePAES");
    }
  }, [questionsState]);
  const getQuestionPrePAES = async () => {
    console.log('hola')
    try {
      const result = await axios.get(UrlGetOneQuestion, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setQuestion(result.data);
      console.log(question)
      localStorage.setItem("questionPrePAES", JSON.stringify(result.data));
      navigate("/PreguntaPrePAES");

    } catch (error) {
      // Manejo de errores si la solicitud falla
      console.error('Error al obtener la pregunta:', error);
    }
  };
  const getDataQuestionPrePAES = async (question_id) => {
    console.log('hola')
    try {
      const result = await axios.get(urlGetDataQuestionPrePAES + question_id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setQuestion(result.data);
      console.log(question)
      localStorage.setItem("questionPrePAES", JSON.stringify(result.data[0]));
      navigate("/PreguntaPrePAES");
    }
    catch (error) {
      // Manejo de errores si la solicitud falla
      console.error('Error al obtener la pregunta:', error);
    }
  }
  const cardData = {
    level: "7",
    category: "?",
    isCorrect: "play bx bxs-lock-alt",
    state: ""
  };
  // valor absoluto de un numero = Math.abs(numero)
  // Creamos un array con 8 elementos para renderizar el componente 8 veces
  const cards = Array(Math.abs(9 - questionsState.length)).fill(null).map((_, index) => (
    <div className='cardBlock'>
      <CardLevel
        key={index} // Asegúrate de proporcionar una clave única para cada elemento en un bucle
        level={index + questionsState.length + 2}
        category={cardData.category}
        isCorrect={cardData.isCorrect}
        state={cardData.state}
      />
    </div>
  ));
  const logicaPreguntaPrePAES = () => {
    localStorage.setItem("stateAnswerPrePAES", false);
    localStorage.removeItem("selectedAnswers");
    if (questionSinResponder.length === 0) {
      getQuestionPrePAES();
    } else {
      getDataQuestionPrePAES(questionSinResponder[0]?.question_id);
    }
  }
  const logicaPreguntaRespondida = (question_id, answer_id) => {      
    localStorage.setItem("selectedAnswers", answer_id);
    localStorage.setItem("stateAnswerPrePAES", true);
    getDataQuestionPrePAES(question_id);
  }
  const nextPage = () => {
    if(questionsState.length >= 10){
      setNumeroFase(numeroFase+1);
      localStorage.setItem("numeroFase", numeroFase+1);
      getQuestionsState(numeroFase);
      console.log('nextpage')
    }        
}
// funcion para retroceder de pagina.
const previousPage = () => {
  if(numeroFase > 1){
    setNumeroFase(numeroFase-1);
    localStorage.setItem("numeroFase", numeroFase-1);
    getQuestionsState(numeroFase);
    console.log('previouspage')
  }   
}
  return (
    <>
      <div className="header">
        <div className="left">
          <h1>Método PrePAES</h1>
        </div>
      </div>
      {questionsState.length < 20 && (
        <>
        <div className='number_phase' >
        <div className="toggle-button-fase" style={{ gridColumnStart:'2', justifySelf:'center'}}>             
               <motion.button
                   className={selectedButton === 'Fase' ? 'Fase active' : 'Fase'}
                   onClick={() => handleButtonClick('Fase')}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   transition={{ duration: 0.2 }}
               >
                   Fase {parseInt(localStorage.getItem('numeroFase'))}
               </motion.button>
               <motion.button
                   className={selectedButton === 'Resumen' ? 'Resumen active' : 'Resumen'}
                   onClick={() => {handleButtonClick('Resumen'); navigate("/ResumenPrePAES")}}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   transition={{ duration: 0.2 }}
                   
               >
                   Resumen 
               </motion.button>
               <motion.div
                   className="indicator"
                   layoutId="indicator"
                   initial={false}
                   animate={{ x: selectedButton === 'Historial' ? 0 : '50%' }}
                   transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                 
               />
           </div>
          {questionsState.length >= 10 && (
              <div className='arrowfase flechafase' onClick={()=>nextPage()}>
                <h4 style={{marginTop:'10px'}}>Fase {parseInt(localStorage.getItem('numeroFase')) + 1 }</h4>
                <div className=''>
                  <Flechafase  />
                </div>
                
              </div>
          )}     
        </div>    
          <div class="cards" style={{ marginTop: '2.5rem' }}>
            {questionsState.map((qs, index) => (
              <div className='card' onClick={() => logicaPreguntaRespondida(qs.question_id, qs.answer_id)} >
                <CardLevel
                  level={index + 1}
                  category={qs.question_subject}
                  isCorrect={qs.answer_state === true ? 'correcta bx bxs-check-circle' : 'incorrecta bx bxs-x-circle'}
                />
              </div>
            ))}
                 {questionsState.length <=9 && (
                  <>
                  <div className='card cardPlay' onClick={() => logicaPreguntaPrePAES()} >
              <CardLevel level={questionsState.length + 1} category="Pendiente" isCorrect="play bx bx-play-circle" />
            </div>
                 {cards}
                  </>  
              )}
          </div>
          <div className='Botones'>
                    <ul className="pagination">
                        <li onClick={previousPage}  className="page-item"><a className="page-link" href="#">Retroceder</a></li>
                        <li className="page-item"><a className="page-link" href="#">{localStorage.getItem('numeroFase')}</a></li>
                        <li onClick={nextPage} className="page-item"><a className="page-link" href="#">Avanzar</a></li>
                    </ul>
                </div>
        </>
      )}
      {!showLineaProgreso && <EnsayoPrePAES onHide={hideLineaProgreso} />}
    </>
  );
};
export default FaseEnsayo;
