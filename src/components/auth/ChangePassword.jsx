import React, { useState, useEffect } from 'react';
import axios from 'axios';
import replace from 'react-string-replace'; // Importa la biblioteca react-string-replace
import { InlineMath } from "react-katex";
import { Apiurl } from '../../Services/apirest';
import { useNavigate } from 'react-router-dom';



const ChangePassword = () => {
    const [form, setForm] = useState({
        "password": "",
        "password2": "",
    });

    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [alertMsg, setalertMsg] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [formErrorPassword, setFormErrorPassword] = useState(false);//permite ver si el formulario esta incompleto
    const [formErrorPasswordMsg, setFormErrorPasswordMsg] = useState(false);//permite ver si el formulario esta incompleto

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

        const urlPath = window.location.pathname;

        // Divide la ruta en segmentos utilizando '/'
        const segments = urlPath.split('/');
        let id = 0; //verificar si esto lo puedo cambiar a algo más seguro
        let token = 0;
        // Verifica si la ruta tiene al menos 5 segmentos
        if (segments.length >= 5) {
        // El tercer segmento es el 'id'
            id = segments[3];

            // El cuarto segmento es el 'token'
            token = segments[4];

            console.log(id)
            console.log(token)
        }
        

        if (!form.password != !form.password2) {
            setFormErrorPassword(true); // Establecer el estado de formError a true si algún campo está vacío
            setFormErrorPasswordMsg('Las contraseñas deben ser iguales')
            setTimeout(() => {
                setFormErrorPassword(false);
            }, 2000); // Desaparecer el mensaje después de 2 segundos
            return; // Si falta algún campo, no se envía el formulario
        }
        else{
            
            const url = Apiurl + "api/reset_password/"+String(id)+"/"+String(token)+"/";
            axios.post(url, form, {
                "uid":id,
                "token":token
            })
            .then(response => {
                    console.log(response.data);
                    setAlert(true);
                    setalertMsg("Contraseña Cambiada correctamente!");
                    
                    setTimeout(() => {
                        setAlert(false);
                    }, 2000);
            })
            .catch(error => {
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
                                <input type='password' name="password" className="form-control" id="password" onChange={manejadorChange} value={form.email} style={{border: "1px solid #ced4da"}} placeholder="Inserte nueva contraseña" />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <div className="">
                                <input type='password' name="password2" className="form-control" id="password2" onChange={manejadorChange} value={form.email} style={{border: "1px solid #ced4da"}} placeholder="Repita nueva contraseña" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 ">
                                <button type="button" className="btn btn-dark mt-2" onClick={manejadorBoton}>Modificar</button>
                                {formErrorPassword === true && (
                                        <div className="alert alert-success mt-3" role="alert">
                                            {formErrorPasswordMsg}
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

export default ChangePassword;