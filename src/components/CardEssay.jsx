import React, { useState, useEffect } from "react";
import { Apiurl } from "../Services/apirest";
import algebra from "../images/algebra.png";
import geometria from "../images/geometria.png";
import numeros from "../images/numeros.png";
import probabilidad from "../images/probabilidad.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import TipsPAES from "./paesHelps/TipsPAES";

const CardEssay = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();  // Get the navigate function
  const apiUrlEssays = Apiurl + "essays/list/all/";
  const ApiurlGetIdEssayUser = Apiurl + "custom_essays/";
  const [showPopup, setShowPopup] = useState(false);
  const [essayId, setEssayId] = useState(0);
  const [essayTemario, setEssayTemario] = useState("");
  const [spinner, setSpinner] = useState(true);
  const showPopupFunction = (essayId, essayTemario) => {
    setEssayId(essayId);
    setEssayTemario(essayTemario);
    setShowPopup(!showPopup);
  }
  const [essays, setEssays] = useState([]);
  useEffect(() => {
    axios.get(apiUrlEssays, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setEssays(res.data);
        setSpinner(false);
      })
  }, []);
  console.log(essays)
  async function IniciarEnsayo(essayId, essayTemario, essayUrl) {
    
    console.log(token)
    const userId = parseInt(localStorage.getItem("user_id"));
    try {
      const response = await axios.post(ApiurlGetIdEssayUser, {
        type_math_ids: [essayId],
        user: userId,
        name: essayTemario,
        is_custom: false,
        current_questions: 10
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.setItem("new_id", response.data.id);
      localStorage.setItem("essayTemario", essayTemario);
      localStorage.removeItem("ensayo");
      localStorage.removeItem("questionsId");
      localStorage.removeItem("selectedAnswers");
      localStorage.removeItem("respuestaId");
      console.log(response.data);
      navigate(`/Ensayos/${essayUrl}/${response.data.id}`)
     
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {spinner && (
        <div className="spinner loading"></div>
      )}
      <ul className="insights">
        {essays.map((essay) => (
          <li key={essay.id} onClick={()=>{showPopupFunction(essay.id, essay.type, essay.type)}}>
            <img className="bx" src={essay.type === "numeros" ? numeros : essay.type === "algebra" ? algebra : essay.type === "geometria" ? geometria : essay.type === "probabilidades" ? probabilidad : crearEnsayo} />
            <span className="info">
              <h3>{essay.type === "numeros" ? "Números" : essay.type === "algebra" ? "Álgebra y Funciones" : essay.type === "geometria" ? "Geometría" : essay.type === "probabilidades" ? "Probabilidad y Estadística" : "Ensayo General"}</h3>
              <p>Matemática(M1)</p>
            </span>
            
          </li>

        ))}
      </ul>
      {showPopup && (
              <div className="popup">
                 
                <div className="popup-content">
                <div className="popup-header">
                  <i className='bx bx-x exitPopup' onClick={()=>{setShowPopup(false)}}></i>
                </div> 
                  <h1 style={{ fontWeight: "bold" }}>{essayTemario === "numeros" ? "Números" : essayTemario === "algebra" ? "Álgebra y Funciones" : essayTemario === "geometria" ? "Geometría" : essayTemario === "probabilidades" ? "Probabilidad y Estadística" : "Ensayo General"}</h1>
                  <p style={{fontSize:'20px', marginTop:'1rem'}}>Tendrá a su disposición <b>20 minutos</b> para contestar el ensayo de <b>10 preguntas</b>, podrá navegar entre preguntas y por el momento <b>no puedes omitirlas</b>. </p>
            
                  <button className="btn btn-outline-dark btn-lg m-2" onClick={() => { IniciarEnsayo(essayId, essayTemario, essayTemario) }}>Iniciar Ensayo</button>
                </div>
              </div>
            )}
    </>
  );
}
export default CardEssay;    