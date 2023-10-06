import React, {useEffect}from "react";
import '../../styles/home.css'
import '../../styles/bootstrap.css'
import '../../styles/responsive.css'
import heroImage from '../../images/DreamShaper_v7_vector_artcorporative_illustrationflat_design_b_1.jpg'
import youtube from '../../images/youtube-g2675e32c1_1280.png'
import beta from '../../images/pruebas-beta.png'
import historial from '../../images/historial.png'
import billete from '../../images/billete-de-banco.png'
import numeros from '../../images/numeros.png'
import progreso from '../../images/progreso.png'
import jovenes from '../../images/jovenes.png'
import inicioPAES from '../../images/inicioPAES.png'
import logoPrePAES from '../../images/prepaesLogo.png'
import axios from "axios"; 
import { Apiurl } from '../../Services/apirest';

const Home = () => {
    useEffect(() => {
        axios.get(Apiurl + "/home")
    }, [])
    return (
        <div style={{ width: '100%', backgroundColor: '#f8f8f8', fontFamily: '"Roboto", sans-serif', lineHeight: '1.5' }}>
            <div className="hero_area">
                <header className="header_section">
                    <div className="container-fluid">
                        <nav className="navbar navbar-expand-lg custom_nav-container ">
                            <a className="navbar-brand" href="#">
                               <span>PRE</span><span style={{ color: 'orange' }} >PAES</span>
                            </a>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className=""> </span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav  ml-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="#">Inicio </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#about"> Sobre nosotros</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#contact">Contacto</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/Login">Iniciar Sesión</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>
                <section class="slider_section ">
                    <div id="customCarousel1" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="container ">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="detail-box">
                                                <h1>
                                                    Prepárate con <br></br>
                                                    <span style={{ color: 'white' }}>PRE<span style={{ color: 'orange' }}>PAES</span></span>
                                                </h1>
                                                <p>
                                                    Nuestra plataforma está diseñada para ayudarte a preparar y alcanzar un excelente desempeño en la PAES de matemáticas.</p>
                                                <div class="btn-box">
                                                    <a href="/Register" class="btn-1">
                                                        Registrarse
                                                    </a>
                                                    <a href="/Login" class="btn-2">
                                                        Iniciar Sesión
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="row">
                                                <div class=" col-lg-10 mx-auto">
                                                    <div class="img-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <img style={{ borderRadius: '20px', width: '80%' }} src={heroImage} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>

                    </div>
                </section>
            </div>
            <section className="service_section layout_padding">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            ¿Qué nos diferencia de las otras
                         plataformas?
                        </h2>
                    </div>
                </div>
                <div className="container ">
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="box ">
                                <div className="img-box">
                                    <img src={youtube} alt="" />
                                </div>
                                <div className="detail-box">
                                    <h4>
                                        Video Feedback
                                    </h4>
                                    <p>
                                        Hemos recopilado videos explicativos para cada pregunta de los ensayos.
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="box ">
                                <div className="img-box">
                                    <img src={beta} alt="" />
                                </div>
                                <div className="detail-box">
                                    <h4>
                                        Pimera versión
                                    </h4>
                                    <p>
                                        Estamos comenzando, iremos agregando más contenido y funcionalidades.
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 ">
                            <div className="box ">
                                <div className="img-box">
                                    <img src={historial} alt="" />
                                </div>
                                <div className="detail-box">
                                    <h4>
                                        Ensayos adaptativos
                                    </h4>
                                    <p>
                                        Con el método PrePAES se te asignará un ensayo adaptativo según tu desempeño.
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="box ">
                                <div className="img-box">
                                    <img src={billete} alt="" />
                                </div>
                                <div className="detail-box">
                                    <h4>
                                        Gratis
                                    </h4>
                                    <p>
                                        Puedes usar la plataforma sin ningún costo.
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="box ">
                                <div className="img-box">
                                    <img src={numeros} alt="" />
                                </div>
                                <div className="detail-box">
                                    <h4>
                                        Enfocado a Matemáticas
                                    </h4>
                                    <p>
                                        Nos encanta las matemáticas y queremos que te gusten también.
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="box ">
                                <div className="img-box">
                                    <img src={progreso} alt="" />
                                </div>
                                <div className="detail-box">
                                    <h4>
                                        Progreso
                                    </h4>
                                    <p>
                                        Podrás ver el historial y estadísticas de tus ensayos.
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id='about' className="about_section layout_padding-bottom">
                <div className="container  ">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="detail-box">
                                <div className="heading_container">
                                    <h2>
                                        Sobre Nosotros
                                    </h2>
                                </div>
                                <p>
                                    Cristian Aguilera y Daniel Durán, son dos estudiantes de Ingeniería Ejecución Informatica cursando su último año de carrera en la PUCV. Comprendemos lo agobiente que puede ser estudiar para la PAES y lo injusto que resulta que una única prueba determine el futuro  de muchos.  </p>
                                <a href="">
                                    Leer más
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className="img-box">
                                <img src={jovenes} alt="" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="server_section">
                <div className="container ">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="img-box">
                                <img src={inicioPAES} alt="" />
                                <div className="play_btn">
                                    <button>
                                        <i class='bx bx-play bx-flip-vertical' ></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="detail-box">
                                <div className="heading_container">
                                    <h2>
                                        Complemento perfecto para tu estudio
                                    </h2>
                                    <p>
                                        No buscamos ser un preuniversitario, queremos que tengas a tu disposicion las herramientas necesarias, para que tener un buen puntaje no sea un impedimento.
                                    </p>
                                </div>
                                <a href="">
                                    Leer más
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contact" className="contact_section layout_padding-bottom" style={{ marginTop: '3rem' }}>
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>
                            Contáctanos
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-lg-6 mx-auto">
                            <div className="form_container">
                                <form action="">
                                    <div>
                                        <input type="text" placeholder="Nombre" />
                                    </div>
                                    <div>
                                        <input type="email" placeholder="Correo" />
                                    </div>
                                    <div>
                                        <input type="text" class="message-box" placeholder="Mensaje" />
                                    </div>
                                    <div className="btn_box ">
                                        <button>
                                            ENVIAR
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="footer_section">
                <div className="container">
                    <p>
                        &copy; <span id="displayYear"></span> PrePAES
             
                    </p>
                </div>
            </footer>
        </div>
    );
};
export default Home;    