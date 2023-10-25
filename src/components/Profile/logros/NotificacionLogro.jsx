import React from 'react'
import insignia from '../../../images/insignia.png'
import '../../../styles/userProfile.css'
const NotificacionLogro = () => {
    return (
        <div className="notificacion-logro">
            <div className='img-container-logro'>
                <img src={insignia} alt="Nombre del logro" />
            </div>
            
            <h3>Nombre del logro</h3>
        </div>
    )
}

export default NotificacionLogro;