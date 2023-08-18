import React, { useEffect, useState } from 'react';
import logoPrePAES from "../images/prepaesLogo.png";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarActive, ubicacionActual }) => {
  
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
        if (window.innerWidth > 576) {
          searchBtnIcon.classList.replace('bx-x', 'bx-search');
          searchForm.classList.remove('show');
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
      <a href="#" className="logo">
        <i className='bx'><img src={logoPrePAES} alt="" /></i>
        <div className="logo-name"><span>Pre</span>PAES</div>
      </a>
      <ul className="side-menu">
      <li className={ubicacionActual === "Ensayos" ? "active" : ""}><a href="#" onClick={()=>{navigate(`/Ensayos`)}}><i className='bx bxs-dashboard'></i>Ensayos</a></li>
      {/*<li className={ubicacionActual === "Metodo PrePAES" ? "active" : ""}><a href="#"><i className='bx bx-receipt'></i>Metodo PrePAES</a></li>*/}
      <li className={ubicacionActual === "Crear ensayo" ? "active" : ""}><a href="#" onClick={()=>{navigate(`/CrearEnsayo`)}}><i className='bx bx-analyse'></i>Crear ensayo</a></li>
      <li className={ubicacionActual === "Progreso" ? "active" : ""}><a href="#" onClick={()=>{navigate(`/Progreso`)}}><i className='bx bx-history'></i>Progreso</a></li>
      <li className={ubicacionActual === "Perfil" ? "active" : ""}><a href="#"onClick={()=>{navigate(`/Perfil`)}}><i className='bx bx-group'></i>Perfil</a></li>
      <li className={ubicacionActual === "Puntajes de corte" ? "active" : ""}><a href="#"><i className='bx bx-cut'></i>Puntajes de corte</a></li>
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

export default Sidebar;
