import React, { useState, useEffect } from "react";
import { Apiurl } from "../../Services/apirest";
import essaycustom from "../../images/customessay.png";
import botPrePAES from "../../images/botPrePAES.png";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Essay from "../essay/Essay";


const CardEssayCustom = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();  // Get the navigate function
  const apiUrlEssaysCustome = Apiurl + "essaysConfig/list/";
  const ApiurlGetIdEssayUser = Apiurl + "custom_essays/";
  const apiUrlDelateEssay = Apiurl + "essaysConfig/retrieve/";
  const [showPopup, setShowPopup] = useState(false);
  const [essayId, setEssayId] = useState(0);
  const [essayTemario, setEssayTemario] = useState("");
  const [essayCurrent, setEssayCurrent] = useState(0);
  const [essayType, setEssayType] = useState([]);
  const [flag, setFlag] = useState(false);
  const [formData, setFormData] = React.useState({});
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
    if (formData.cantidadPreguntas) {
      setFlag(true);
    }

    console.log(formData);
  }, [formData]);
  const showPopupFunction = (essayId, essayName, EssayCurrent, essayType) => {
    setEssayId(essayId);
    setEssayTemario(essayName);
    setEssayCurrent(EssayCurrent);
    setEssayType(essayType);
  
    setShowPopup(!showPopup);
  }
  const [essaysConfig, setEssaysConfig] = useState([]);
  useEffect(() => {
    axios.get(apiUrlEssaysCustome, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res.data)
        setEssaysConfig(res.data);
        

      })
  }, []);

  async function DeleteEssay(id) {
    try {
      const response = await axios.delete(apiUrlDelateEssay + id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setShowPopup(false);
      setEssaysConfig(essaysConfig.filter(essay => essay.id !== id));

    } catch (error) {
      console.log(error);
    }
  }

  async function IniciarEnsayo(cantidadPreguntas, essayTemario, ensayosArray) {

    console.log(token)
    const userId = parseInt(localStorage.getItem("user_id"));

    try {
      const response = await axios.post(ApiurlGetIdEssayUser, {
        type_math_ids: ensayosArray,
        user: userId,
        name: essayTemario,
        is_custom: true,
        current_questions: cantidadPreguntas
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.setItem("new_id", response.data.id);
      localStorage.setItem("essayTemario", essayTemario);
      setFormData({ cantidadPreguntas, ensayosArray });
      localStorage.removeItem("ensayo");
      console.log(response.data);
      await new Promise(resolve => setTimeout(resolve, 100));
      navigate(`/CrearEnsayoTest/${essayTemario}/${response.data.id}`)


    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {!essaysConfig.length && (
        <div className="errorEssayConfig">
          <h4>Aun no se Crean ensayos personalizados</h4>
          <img src={botPrePAES} style={{ width: '170px' }} />
        </div>
      )}
      <ul className="insights">
        {essaysConfig.map((essay) => (
          <li onClick={() => { showPopupFunction(essay.id, essay.name, essay.questionNumber, essay.user_Essay_Config_types_all ) }}>
            <img className="bx" src={essaycustom} />
            <span className="info">
              <h3>{essay.name}</h3>
              <p>Ensayo Personalizado</p>
            </span>

          </li>

        ))}
      </ul>
      {showPopup && (
        <div className="popup">

          <div className="popup-content">
            <div className="popup-header">
              <i class='bx bx-x exitPopup' onClick={() => { setShowPopup(false) }}></i>
            </div>
            <h1 style={{ fontWeight: "bold" }}>{essayTemario}</h1>
            <ul className="mt-3 mb-3">
              <li>Preguntas: {essayCurrent}</li>
              <li>Temario: {essayTemario}</li>
              <li>Categorías: {essayType.map((types)=>{
                return(
                  <span>{types.math_type_type} </span>
                )
              })}</li>
            </ul>
            <h3>¿Desea iniciar el ensayo?</h3>
            <div className="popup-buttons">
              <button className="btn btn-outline-dark btn-lg m-2" onClick={() => { IniciarEnsayo(essayCurrent, essayTemario, essayType) }}>Iniciar Ensayo</button>
              <button className="btn btn-outline-danger btn-lg m-2" onClick={() => { DeleteEssay(essayId) }}>Eliminar Configuracion</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CardEssayCustom;    