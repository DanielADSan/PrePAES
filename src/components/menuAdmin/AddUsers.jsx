import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Apiurl } from '../../Services/apirest';
import replace from 'react-string-replace'; // Importa la biblioteca react-string-replace
import { InlineMath } from "react-katex";

const AddUsers = () => {
    const urlCreateUser = Apiurl + "api/register/";
    //const urlCreateAnswer = Apiurl + "answers/create/";
    const [showPopup, setShowPopup] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    
    const [formSubmitted, setFormSubmitted] = useState(false);//permite ver si el formulario es enviado
    const [formError, setFormError] = useState(false);//permite ver si el formulario esta incompleto
    const [formErrorPassword, setFormErrorPassword] = useState(false);//permite ver si el formulario esta incompleto
    const [formErrorEmail, setFormErrorEmail] = useState(false);//permite ver si el formulario esta incompleto

    const [errorEmailMsg, setErrorEmailMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [errorPasswordMsg, setErrorPasswordMsg] = useState("");
    const [alertMsg, setalertMsg] = useState("");

    const token = localStorage.getItem("token");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password || !password2) {
            setFormError(true); // Establecer el estado de formError a true si algún campo está vacío
            setErrorMsg("Todos los campos son necesarios.");
            setTimeout(() => {
                setFormError(false);
            }, 2000); // Desaparecer el mensaje después de 2 segundos
            return; // Si falta algún campo, no se envía el formulario
        }

        if (password != password2) {
            setFormErrorPassword(true); // Establecer el estado de formError a true si algún campo está vacío
            setErrorPasswordMsg("Las contraseñas deben ser iguales.")
            setTimeout(() => {
                setFormErrorPassword(false);
            }, 2000); // Desaparecer el mensaje después de 2 segundos
            return; // Si falta algún campo, no se envía el formulario
        }

        setFormError(false); // Establecer el estado de formError a false antes de enviar el formulario
        setFormErrorPassword(false);
        const userData = { username, email, password, password2};
        const response = await axios.post(urlCreateUser, userData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then(response => {
            setFormSubmitted(true); // Establecer el estado de formSubmitted a true después de enviar el formulario
            setalertMsg("¡El usuario se ha creado correctamente!");
            setTimeout(() => {
                setFormSubmitted(false);
            }, 2000); // Desaparecer el mensaje después de 2 segundos
        })
        .catch(error => {
            if (error.response.status == 400){
                setFormErrorEmail(true);
                setErrorEmailMsg(error.response.data['message']);
                setTimeout(() => {
                    setFormErrorEmail(false);
                }, 2000);
            }
        });
        
        
    };
    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <div className='bottom-data'>
                <div className='orders'>
                    <div className='header'>
                        <i class='bx bx-stats'></i>
                        <h3>Añadir Usuario</h3>
                        <i class='bx bx-filter'></i>

                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2" >
                            <label htmlFor="username" className='mb-2'>Nombre de usuario:</label>
                            <input type="text" class="form-control" name="username" id="username" placeholder="ingrese nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} style={{border: "1px solid #ced4da"}}></input>
                        </div>

                        <div className="form-group mb-2" >
                            <label htmlFor="email" className='mb-2'>Correo electronico:</label>
                            <input type="email" class="form-control" id="email" name="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>

                        <div className="form-group mb-2" >
                            <label htmlFor="password" className='mb-2'>Contraseña</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="ingrese contraseña" value={password} onChange={(e) => setPassword(e.target.value)} style={{border: "1px solid #ced4da"}}></input>
                        </div>

                        <div className="form-group mb-2" >
                            <label htmlFor="password2" className='mb-2'>Repita contraseña</label>
                            <input type="password" className="form-control" id="password2" name="password2" placeholder="repita contraseña" value={password2} onChange={(e) => setPassword2(e.target.value)} style={{border: "1px solid #ced4da"}}></input>
                        </div>

                        

                        {formError && (
                            <div className="alert alert-danger mt-4" role="alert">
                                {errorMsg}
                            </div>
                        )}
                        {formErrorPassword && (
                            <div className="alert alert-danger mt-4" role="alert">
                                {errorPasswordMsg}
                            </div>
                        )}
                        {formErrorEmail && (
                            <div className="alert alert-danger mt-4" role="alert">
                                {errorEmailMsg}
                            </div>
                        )}
                        {formSubmitted && (
                            <div className="alert alert-success mt-4" role="alert">
                                {alertMsg}
                            </div>
                        )}
                        <button type="submit" className="btn  btn-warning mb-2 p-2 mt-4  ">Añadir Usuario</button>
           
                    </form>
                </div>
            </div>

        

        </>

    );
};

export default AddUsers;