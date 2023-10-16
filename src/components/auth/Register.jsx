import React, { Component } from 'react';
import axios from 'axios';
import {Apiurl} from '../../Services/apirest'
const tokenName = 'user_uaeh_token';
const baseUrl= Apiurl+"api/";

class Register extends Component {
  state = {
    form: {
      email: '',
      username: '',
      password: '',
      password2: ''
    },
    errors: [], // Array para almacenar los mensajes de error
    spinner: false,
  };

  manejadorSubmit = e => {
    e.preventDefault();
    this.signUp();
  };

  manejadorChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

  signUp =  () => {
    const { email, username, password, password2 } = this.state.form;
    const { errors } = this.state;
    // Crear una variable local para almacenar los errores temporales
    let newErrors = [];
    // Verificar si el error ya está en el estado
    const isDuplicateError = (error) => {
      return errors.includes(error);
    };
  
    // Función para agregar un error al estado
    const addError = (error) => {
      if (!isDuplicateError(error)) {
        this.setState((prevState) => ({
          errors: [...prevState.errors, error],
        }));
      }
    };
  
    // Función para eliminar un error del estado
    const removeError = (error) => {
      if (isDuplicateError(error)) {
        this.setState((prevState) => ({
          errors: prevState.errors.filter((e) => e !== error),
        }));
      }
    };
  
    // Limpiar el estado de errores al inicio
   
  
    
  if (username.trim() === "") {
    newErrors.push("El nombre de usuario es un campo obligatorio");
  }

  if (email.trim() === "") {
    newErrors.push("El email es un campo obligatorio");
  }

  if (password.trim() === "") {
    newErrors.push("La contraseña es un campo obligatorio");
  }

  if (password !== password2) {
    newErrors.push("Las contraseñas no coinciden");
  }
  
    if (newErrors.length === 0) {
      /* Hacer la petición axios o cualquier otra acción aquí */
      return new Promise((resolve, reject) => {
        const instance = axios.create({
          baseURL: baseUrl,
          headers: {
            "Content-Type": "application/json",
          },
        });
        instance
          .post("register/", this.state.form)
          .then((r) => {
            localStorage.setItem(tokenName, JSON.stringify(r.data.key));
            resolve(r.data);
            if (r.data) {
              window.location.href = "./Login";
            } else console.log(r.data.password);
            console.log(r.data)
            this.setState({
              spinner: false,
          })
          })
          .catch((e) => {
            this.setState({
              spinner: false,
          })
            console.log(e.response.data);
            if (e.response.data.password && e.response.data.password === "Las contraseñas deben coincidir.") {
              newErrors.push("Las contraseñas no coinciden");
            }
      
            if (e.response.data.email && e.response.data.email[0] === "Ya existe users con este email.") {
              newErrors.push("Ya existe un usuario con este email.");
            }
      
            if (e.response.data.email && e.response.data.email[0] === "Introduzca una dirección de correo electrónico válida.") {
              newErrors.push("Introduzca una dirección de correo electrónico válida.");
            }
      
            // Actualizar el estado de los errores al final
            this.setState({ errors: newErrors });
          });
        
    
      });
    } else {
      // Si hay errores de validación, actualiza el estado de los errores
      this.setState({ errors: newErrors });
    }
  };
  

  handleBackendError = error => {
    const { response } = error;

    if (response && response.data && response.data.email && response.data.email[0] === 'Ya existe users con este email.') {
      this.setState(prevState => ({
        errors: [...prevState.errors, 'Ya existe un usuario con este correo electrónico.']
      }));
    } else {
      console.log('Error desconocido:', error);
    }
  };

  render() {
    return (
      <body className="cuerpoLogin">
     
        <form className="formulario" id="formularioL" onSubmit={this.manejadorSubmit}>
          <h1 className="hero_register"><p>Registro</p></h1>
          <div className="contenedorRegister">
            <div className="input-contenedor">
         
              <input
                name="username"
                id=""
                type="text"
                onChange={this.manejadorChange}
                placeholder="Nombre de usuario"
              />
            </div>
            <div className="input-contenedor">
            
              <input
                name="email"
                id="emailL"
                type="text"
                onChange={this.manejadorChange}
                placeholder="Correo Electronico"
              />
            </div>
            <div className="input-contenedor">
           
              <input
                type="password"
                name="password"
                id="password1"
                onChange={this.manejadorChange}
                placeholder="Contraseña"
              />
            </div>
            <div className="input-contenedor">
         
              <input
                type="password"
                name="password2"
                id="password2"
                onChange={this.manejadorChange}
                placeholder="Confirma tu contraseña"
              />
            </div>
            <button type="submit" id="login" className="button" >
              Registrate
            </button>
            {this.state.errors.length > 0 && (
              <div className="alert alert-danger mt-3" role="alert">
                {this.state.errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            {this.state.spinner === true &&
              <div className="spinner loading" style={{ marginTop: '1rem' }}></div>}
            <p className="pLogin mt-3">Al registrarte, aceptas nuestras Condiciones de uso y Política de privacidad.</p>
            <p className="pLogin">
              ¿Ya tienes una cuenta? <a className="link" href="./Login">Iniciar Sesion</a>
            </p>
          </div>
        </form>
      </body>
    );
  }
}

export default Register;
