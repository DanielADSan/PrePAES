import React, { useState } from 'react';
import Essay from "./Essay";
import axios from 'axios';
import { useEffect } from 'react';
import { Apiurl } from "../../Services/apirest";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import '../../styles/menuApp.css'
import { useLocation } from 'react-router-dom';
const GetEssayCustomTest = () => {
  const ApiUrl = Apiurl + `questions_types/`;
  const [ensayoSelected, setensayoSelected] = useState(JSON.parse(localStorage.getItem('formData')).ensayosArray );
  const [current_questions] = useState(JSON.parse(localStorage.getItem('formData')).cantidadPreguntas);
  const [post, setPost] = React.useState([]);
  const [nombreEnsayo] = React.useState("");
  const [iniciar, setIniciar] = React.useState(false);
  const [ensayosArray, setEnsayosArray] = useState([]);
  const [sidebarActive, setSidebarActive] = useState(JSON.parse(localStorage.getItem("sidebarActive")) || false);
  const token = localStorage.getItem("token");
  const toggleSidebar = () => {
    setSidebarActive(prevState => !prevState);
  };
  useEffect(() => {
    localStorage.setItem("sidebarActive", sidebarActive);
  }, [sidebarActive]);
  
  useEffect(() => {
    if (ensayoSelected.length != 0) {
      async function getEssay() {
        const numeroDePreguntas = parseInt(current_questions);

        console.log(numeroDePreguntas)
        try {
          const response = await axios.get(ApiUrl+ensayoSelected.join(',')+'/'+numeroDePreguntas, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setPost(response.data);
          setIniciar(true);
        } catch (error) {
          console.log(ensayosArray)
          console.log(error);
        }
      };
      getEssay();
    }
   
  }, [iniciar, ensayosArray]);

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
          {iniciar && (
            <Essay
              ensayo={post}
              titleEnsayo={nombreEnsayo}
            />
          )}
        </main>
      </div>
    </>
  );
}
export default GetEssayCustomTest;