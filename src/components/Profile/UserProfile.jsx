import { useState, useEffect } from 'react' /*por defecto, useEffect rederiza todo lo dentro al cargar la pagina*/
import '../../styles/userProfile.css'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import axios from 'axios';
import insignia from '../../images/insignia.png'
import { Apiurl } from '../../Services/apirest';
import Logros from './logros/Logros';
import Avatares from './Avatares';

const ApiurlUsersRetrieveUpdateDestroy = Apiurl + 'users/'
const ApiurlChangePassword = Apiurl + 'api/change_password_profile/'
const ApiUserData = Apiurl + 'api/profile/'

const UserProfile = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem('user_id');
    const [showPopup, setShowPopup] = useState(false);
    const [errorTypeData, setErrorTypeData] = useState('');
    const [errorTypePassword, setErrorTypePassword] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(0);
    const [sidebarActive, setSidebarActive] = useState(JSON.parse(localStorage.getItem("sidebarActive")) || false);
    const [avatar, setAvatar] = useState('');
    const avatars = [
        'https://res.cloudinary.com/dohtxxlbe/image/upload/v1698699339/Avatares%20PrePAES/usuario_utpbap.png',
        'https://res.cloudinary.com/dohtxxlbe/image/upload/v1698681866/Avatares%20PrePAES/avatarUno_vfoqgv.png',
        'https://res.cloudinary.com/dohtxxlbe/image/upload/v1698681867/Avatares%20PrePAES/avatarCinco_mpopsp.png',
        'https://res.cloudinary.com/dohtxxlbe/image/upload/v1698681867/Avatares%20PrePAES/avatarDos_vzxl47.png',
        'https://res.cloudinary.com/dohtxxlbe/image/upload/v1698681866/Avatares%20PrePAES/avatarTres_daxlzr.png',
        'https://res.cloudinary.com/dohtxxlbe/image/upload/v1698681866/Avatares%20PrePAES/avatarCuatro_ufwz9f.png',
        'https://res.cloudinary.com/dohtxxlbe/image/upload/v1698681866/Avatares%20PrePAES/avatarSeis_fuhdnx.png',
      ];

    const toggleSidebar = () => {
        setSidebarActive(prevState => !prevState);
    };
    useEffect(() => {
        localStorage.setItem("sidebarActive", sidebarActive);
    }, [sidebarActive]);
    useEffect(() => {
        // Esta función se ejecutará después de que el componente se haya montado en el DOM.
        userData();
    }, []);

    async function userData() {
        //const token = localStorage.getItem("token");

        const userData = await axios.get(ApiUserData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const newEmail = document.getElementById("email");
        const newUserName = document.getElementById("username");

        newEmail.value = userData.data.email
        newUserName.value = userData.data.username
        setAvatar(userData.data.avatar)

        setSelectedAvatar(avatars.indexOf(userData.data.avatar))

        console.log(userData.data)
    }

    async function updateUserData() {

        setErrorTypeData('');
        //const token = localStorage.getItem("token");

        // const userId = parseInt(localStorage.getItem("userId"));

        const newEmail = document.getElementById("email");
        const newUserName = document.getElementById("username");

        if (newEmail.value === '') {
            try {
                const response = await axios.patch(ApiurlUsersRetrieveUpdateDestroy + String(userId) + '/', {
                    username: newUserName.value,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (error) {
                setErrorTypeData('username_email');
                console.log(error);
            }
        }

        if (newUserName.value === '') {
            try {
                const response = await axios.patch(ApiurlUsersRetrieveUpdateDestroy + String(userId) + '/', {
                    email: newEmail.value,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (error) {
                setErrorTypeData('username_email');
                console.log(error);
            }
        }

        if (newUserName.value != '' && newEmail.value != '') {
            try {
                const response = await axios.patch(ApiurlUsersRetrieveUpdateDestroy + String(userId) + '/', {
                    email: newEmail.value,
                    username: newUserName.value,
                    avatar:avatars[selectedAvatar],
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                //recargar pagina
                
            } catch (error) {
                console.log(selectedAvatar)
                setErrorTypeData('username_email');
                console.log(error);
            }
        }
        userData();
    }

    async function updatePassword() {

        setErrorTypePassword('');
        //const token = localStorage.getItem("token");

        // const userId = parseInt(localStorage.getItem("userId"));


        const actualPassword = document.getElementById("passwordActual");
        const passwordNew = document.getElementById("passwordNew");
        const passwordNew2 = document.getElementById("passwordNew2");
        if (actualPassword.value != '' || passwordNew.value != '' || passwordNew2.value != '') {

            try {
                const response = await axios.patch(ApiurlChangePassword, {
                    actualPassword: actualPassword.value,
                    password: passwordNew.value,
                    password2: passwordNew2.value,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } catch (error) {
                setErrorTypePassword('password');
                console.log(error);
            }
        }
    }

    const togglePopup = () => {
        setShowPopup(!showPopup);
       // Cambia el estado de visibilidad del popup
    };

    return (
        <>
            <Sidebar sidebarActive={sidebarActive} ubicacionActual={"Perfil"} />
            <div className="content"  >
                <Navbar toggleSidebar={toggleSidebar} />
                <main>
                    <div className="header">

                        <div className='profile-container' >
                            <section>
                                <div className="left">
                                    <h1>Perfil</h1>

                                </div>
                                <div className='containerUserData'>

                                    <div className='containerSpace'>
                                        <h2>Mi cuenta</h2>
                                        <div className='containerData'>
                                            <h4 href="username">Nombre De Usuario</h4>
                                            <input type="text" name="username" id="username" className="input-group-text" />
                                        </div>
                                        <div className='containerData'>
                                            <h4 href="email">Email</h4>
                                            <input type="text" name="email" id="email" className="input-group-text"  disabled />
                                        </div>
                                        <div className='containerData' style={{alignSelf:'center', alignItems:'center'}}>
                                            <h4 href="avatar">Avatar</h4>
                                            <Avatares const selectedAvatar = {selectedAvatar} setSelectedAvatar = {setSelectedAvatar} avatar = {avatar}/>
                                        </div>
                                       

                                    </div>
                                    <div className='containerSpace'>
                                        <h2>Contraseña</h2>
                                        <div className='containerData'>
                                            <h4 href="password">Contraseña actual</h4>
                                            <input type="text" name="passwordActual" id="passwordActual" className="input-group-text" />
                                        </div>
                                        <div className='containerData'>
                                            <h4 href="password">Contraseña nueva</h4>
                                            <input type="text" name="passwordNew" id="passwordNew" className="input-group-text" />
                                        </div>
                                        <div className='containerData'>
                                            <h4 href="password">Repita nueva contraseña</h4>
                                            <input type="text" name="passwordNew2" id="passwordNew2" className="input-group-text" />
                                        </div>
                                        <button type="button" className="btn-perfil btn btn-outline-dark updateButton" onClick={() => { updateUserData(); updatePassword(); togglePopup() }}>Guardar cambios</button>
                                    </div>

                                    {showPopup && (
                                        <div className='popup'>
                                            <div className='popup-content'>
                                                <div className='popup-header'>
                                                    <i className='bx bx-x exitpopup' onClick={togglePopup}></i>
                                                </div>
                                                <h1 style={{ fontWeight: "bold" }}></h1>

                                                {errorTypeData === 'username_email' && (
                                                    <p>Verifique que los campos de usuario y correo electrónico esten completos y en el formato correcto</p>
                                                )}

                                                {errorTypePassword === 'password' && (
                                                    <p>Verifique que la contraseña actual es correcta y que las contraseña nueva es igual en ambos campos</p>
                                                )}

                                                {errorTypeData === '' && errorTypePassword === '' && (
                                                    <p>Sus datos han sido modificados con exito</p>
                                                )}

                                                <button type="button" className="btn btn-outline-dark btn-lg " onClick={()=>{togglePopup; window.location.reload(); }}>Cerrar</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>
                            <section>
                                <div className="left">
                                    <h1>Logros</h1>
                                </div>
                                <Logros />
                            </section>

                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default UserProfile;