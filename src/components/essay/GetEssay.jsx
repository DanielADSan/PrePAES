import React, { useState, useEffect } from "react";
import axios from "axios";
import { Apiurl } from "../../Services/apirest";
import Essay from "./Essay";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import '../../styles/menuApp.css'
import { useLocation } from 'react-router-dom';
const GetEssay = () => {
  const location = useLocation();
  const tema = location.pathname.split('/')[2]; // Obtenemos el valor del tercer segmento de la URL

  const ApiUrl = Apiurl + "questions_alternative/?subject=" + tema;
  const [post, setPost] = React.useState(null);
  const [sidebarActive, setSidebarActive] = useState(JSON.parse(localStorage.getItem("sidebarActive")) || false);

  const toggleSidebar = () => {
    setSidebarActive(prevState => !prevState);
  };
  useEffect(() => {
    localStorage.setItem("sidebarActive", sidebarActive);
  }, [sidebarActive]);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(ApiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setPost(res.data);
        console.log(res.data)

      })
  }, []);
  if (!post) return null;
  function shuffleArray(array) {
    const newArray = [...array];
    newArray.sort(() => Math.random() - 0.5);
    return newArray;
  }

  for (let i = 0; i < post.length; i++) {
    post[i].answer = shuffleArray(post[i].answer);
  }


  return (
    <>
      <Sidebar sidebarActive={sidebarActive} ubicacionActual={"Ensayos"} />
      <div className="content">

        <Navbar toggleSidebar={toggleSidebar} />
        <main >
          <Essay
            ensayo={shuffleArray(post).slice(0, 10)}
            titleEnsayo={localStorage.getItem("essayTemario") === "numeros" ? "Números" : localStorage.getItem("essayTemario") === "algebra" ? "Álgebra y Funciones" : localStorage.getItem("essayTemario") === "geometria" ? "Geometría" : localStorage.getItem("essayTemario") === "probabilidades" ? "Probabilidad y Estadística" : "Ensayo General"}
          />
        </main>
      </div>
    </>
  );
};
export default GetEssay;
