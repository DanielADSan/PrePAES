import React, { useEffect, useState } from 'react';
import logoPrePAES from "../../images/prepaesLogo.png";
import { useNavigate } from 'react-router-dom';

const SidebarAdmin = ({ sidebarActive, ubicacionActual }) => {
  
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("email");
    window.location.href = "/";
  };
  
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/Login";
    }
  }, []);
 
  const navigate = useNavigate();  // Get the navigate function
  useEffect(() => {
    const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
    sideLinks.forEach(item => {
      const li = item.parentElement;
      item.addEventListener('click', () => {
        sideLinks.forEach(i => {
          i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
      })
    });
      const searchBtn = document.querySelector('.content nav form .form-input button');
      const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
      const searchForm = document.querySelector('.content nav form');
      const sideBar = document.querySelector('.sidebar');



      window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
          sideBar.classList.add('close');
        } else {
          sideBar.classList.remove('close');
        }
  

    });
    const toggler = document.getElementById('theme-toggle');
const darkThemeClass = 'dark';

// Obtener el estado del tema almacenado en localStorage al cargar la página
const isDarkTheme = localStorage.getItem('isDarkTheme') === 'true';

// Aplicar la clase al cuerpo según el estado del tema almacenado
if (isDarkTheme) {
    document.body.classList.add(darkThemeClass);
    toggler.checked = true;
}

toggler.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add(darkThemeClass);
        localStorage.setItem('isDarkTheme', 'true'); // Guardar el estado en localStorage
    } else {
        document.body.classList.remove(darkThemeClass);
        localStorage.setItem('isDarkTheme', 'false'); // Guardar el estado en localStorage
    }
});


  }, []);

  return (
    <div className={`sidebar${sidebarActive ? '' : ' close'}`}>
      <a href="#"onClick={()=>{navigate(`/Preguntas`),localStorage.removeItem("ensayo"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntuacion"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("selectedAnswers"),localStorage.removeItem("preguntaActual"),localStorage.removeItem("respuesta"),localStorage.removeItem("tituloPregunta"), localStorage.removeItem("tiempoRestante")}} className="logo">
        <i className='bx'><img src={logoPrePAES} alt="" /></i>
        <div className="logo-name"><span>Pre</span>PAES</div>
      </a>
      <ul className="side-menu">
      <li className={ubicacionActual === "Notificaciones" ? "active" : ""}><a href="#" onClick={()=>{navigate(`/Notificaciones`),localStorage.removeItem("ensayo"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntuacion"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("selectedAnswers"),localStorage.removeItem("preguntaActual"),localStorage.removeItem("respuesta"),localStorage.removeItem("tituloPregunta"), localStorage.removeItem("tiempoRestante")}}><i className='bx bxs-notification'></i>Notificaciones</a></li>
      <li className={ubicacionActual === "Preguntas" ? "active" : ""}><a href="#" onClick={()=>{navigate(`/Preguntas`),localStorage.removeItem("ensayo"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntuacion"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("selectedAnswers"),localStorage.removeItem("preguntaActual"),localStorage.removeItem("respuesta"),localStorage.removeItem("tituloPregunta"), localStorage.removeItem("tiempoRestante")}}><i className='bx bx-question-mark'></i>Administrar Preguntas</a></li>
      <li className={ubicacionActual === "Usuarios" ? "active" : ""}><a href="#" onClick={()=>{navigate(`/Usuarios`),localStorage.removeItem("ensayo"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntuacion"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("puntajeFinal"),localStorage.removeItem("selectedAnswers"),localStorage.removeItem("preguntaActual"),localStorage.removeItem("respuesta"),localStorage.removeItem("tituloPregunta"), localStorage.removeItem("tiempoRestante")}}><i className='bx bxs-user-detail'></i>Administrar Usuarios</a></li>
      {/*<li className={ubicacionActual === "Metodo PrePAES" ? "active" : ""}><a href="#"><i className='bx bx-receipt'></i>Metodo PrePAES</a></li>*/}
   
    
    </ul>
      <ul className="side-menu">
        <li>
          <a href="#" onClick={()=>cerrarSesion()} className="logout">
            <i className='bx bx-log-out-circle'></i>
            Cerrar Sesion
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
