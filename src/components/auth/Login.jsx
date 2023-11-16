import React, { Component, useRef, useState } from 'react';
import axios from 'axios';
import { Apiurl } from '../../Services/apirest'
import '../../styles/Login.css'
import { useNavigate } from 'react-router-dom';

class Login extends React.Component {


    state = {
        form: {
            "email": "",
            "password": "",
        },
        error: false,
        errorMsg: "",
        spinner: false,
    };

    manejadorSubmit = e => {
        e.preventDefault();
    }

    manejadorChange = async e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })

    }
    onChange = async e => {
        if (e) {
            estadoCaptcha = true;
            console.log('si funciona')
        }
    }
    manejadorEnter = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault(); // Evita que el formulario se envíe por defecto al presionar Enter
          this.manejadorBoton(); // Llama a tu función de manejo del botón
        }
      };
    manejadorBoton = () => {

        let url = Apiurl + 'api/login/';
        this.setState({
            spinner: true,
        })
        axios.post(url, this.state.form)
            .then(response => {
                console.log(response.data.token.access);
                if (response.data.status === "ok") {
                    console.log(response);
                    localStorage.setItem("token", response.data.token.access);
                    localStorage.setItem("is_admin", response.data.is_admin);
                    localStorage.setItem("user_id", response.data.user_id);
                    localStorage.setItem("username", response.data.username);
                    localStorage.setItem("date_login", Date.now());
                    localStorage.setItem("email", this.state.form.email);
                    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token.access}`;
                    this.setState({
                        spinner: false,
                    })
                    if (response.data.is_admin === true) {
                        window.location.href = "/Preguntas";
                    }
                    else
                        window.location.href = "/Ensayos";


                } else {
                    console.log("error");
                    this.setState({
                        error: true,
                        errorMsg: response.data.errors
                    });
                }
            }).catch(error => {
                console.log(error.response.data.errors)
                this.setState({
                    spinner: false,
                })
                if (error.response.data.errors.email) {
                    if (error.response.data.errors.email[0] === 'Introduzca una dirección de correo electrónico válida.')
                        this.setState({
                            error: true,
                            errorMsg: "Introduzca una dirección de correo electrónico válida."
                        })
                    else if (error.response.data.errors.email[0] || error.response.data.password[0] === 'Este campo no puede estar en blanco.')
                        this.setState({
                            error: true,
                            errorMsg: "Rellene todos los campos"
                        })
                }
                else if (error.response.data.errors.error_de_campo) {
                    if (error.response.data.errors.error_de_campo[0] === 'Email o contraseña invalidos')
                        this.setState({
                            error: true,
                            errorMsg: "Email o contraseña invalidos"
                        })

                }
                else if (error.response.data.errors.password) {
                    if (error.response.data.errors.password[0] === 'Este campo no puede estar en blanco.')
                        this.setState({
                            error: true,
                            errorMsg: "Rellene todos los campos"
                        })
                }


            })

    }

    render() {
        return (
            <React.Fragment>
                <div className="cuerpoLogin">
                    <header className="header_section" style={{ fontFamily: 'Roboto, sans-serif' }}>
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
                    <form className="formulario" id="formularioL" onKeyPress={this.manejadorEnter} >
                        <h1 className='hero_register'><span>Iniciar</span> <span style={{ color: '#F0AD4E' }}>Sesión</span></h1>
                        <div className="contenedorLogin ">


                            <div className="input-contenedor">

                                <input name="email" id="emailL" type="text" onChange={this.manejadorChange} placeholder="Correo Electrónico" />

                            </div>

                            <div className="input-contenedor">

                                <input type="password" name="password" id="passwordL" onChange={this.manejadorChange} placeholder="Contraseña" />

                            </div>


                            <button type="button" id="login" className="button" onClick={this.manejadorBoton}>Iniciar Sesión</button>
                            {this.state.error === true &&
                                <div className="alert alert-danger mt-3 text" role="alert">
                                    {this.state.errorMsg}
                                </div>
                            }
                            {this.state.spinner === true &&
                                <div className="spinner loading" style={{ marginTop: '1rem' }}></div>}
                            <p className='pLogin mt-3'>¿No tienes una cuenta? <a className="link" href="/Register" >Registrarse</a></p>
                            <p className='pLogin mt'>¿Has olvidado tu contraseña? <a className='link' href="/Reset">Recuperar contraseña</a></p>
                        </div>
                    </form>

                </div>
            </React.Fragment>
        );
    }
}
export default Login