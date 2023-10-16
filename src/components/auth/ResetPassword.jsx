import React, { useState, useEffect } from 'react';
import axios from 'axios';
import replace from 'react-string-replace'; // Importa la biblioteca react-string-replace
import { InlineMath } from "react-katex";
import { Apiurl } from '../../Services/apirest';
import { useNavigate } from 'react-router-dom';



const ResetPassword = () => {
    const [form, setForm] = useState({
        "email": "",
    });
    const [errorNotFound, setErrorNotFound] = useState(false);
    const [errorNotFoundMsg, setErrorNotFoundMsg] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertMsg, setalertMsg] = useState("");

    const manejadorSubmit = (e) => {
        e.preventDefault();
    };

    const manejadorChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const manejadorBoton = () => {

        if (!form.email) {
            setErrorNotFound(true);
            setErrorNotFoundMsg("Debe ingresar un correo electronico");
            setTimeout(() => {
                setErrorNotFound(false);
            }, 2000);
        }
        else{
            const url = Apiurl + "api/send_reset_password_email/";
            axios.post(url, form, {
        
            })
            .then(response => {
                    console.log(response.data);
                    setAlert(true);
                    setalertMsg("Correo enviado!");
                    
                    setTimeout(() => {
                        setAlert(false);
                    }, 2000);
            })
            .catch(error => {
                          
                setErrorNotFound(true);
                setErrorNotFoundMsg("El correo electronico ingresado no se encuentra asociado a una cuenta");
                setTimeout(() => {
                    setErrorNotFound(false);
                }, 2000);
                    console.log(error.response.data);
                });    
        }
    };

    const handleClick = (email) => {
        setForm({
            email: email
        });

    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
      
    return (
        <React.Fragment>
            <body className="cuerpoLogin">
                    <header className="header_section" style={{fontFamily:'Roboto, sans-serif'}}>
                        <div className="container-fluid">
                            <nav className="navbar navbar-expand-lg custom_nav-container ">
                                <a className="navbar-brand" href="./">
                                    <span>PRE</span><span style={{ color: 'orange' }} >PAES</span>
                                </a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className=""> </span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav  ml-auto">
                                        <li className="nav-item active">
                                            <a className="nav-link" href="./">Inicio </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/Login">Iniciar Sesión</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </header>
                    <form className="formulario" id="formularioReset"  action="/action_page.php" onSubmit={manejadorSubmit}>
                        <h1 className='hero_register'><span>Recuperar</span> <span style={{ color: '#F0AD4E' }}>Contraseña</span></h1>
                        <div className="form-group mt-3">
                            <div className="">
                                <input type='email' name="email" className="form-control" id="email" onChange={manejadorChange} value={form.email} style={{border: "1px solid #ced4da"}} placeholder="Inserte Correo electronico" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 ">
                                <button type="button" className="btn btn-dark mt-2" onClick={manejadorBoton}>Envivar correo de recuperación</button>
                                {errorNotFound === true && (
                                    <div className="alert alert-danger mt-3" role="alert">
                                        {errorNotFoundMsg}
                                    </div>
                                )}
                                {alert === true && (
                                        <div className="alert alert-success mt-3" role="alert">
                                            {alertMsg}
                                        </div>
                                )}
                            </div>
                        </div>
                    </form>                                  
            </body>

        </React.Fragment>
    );
};

export default ResetPassword;