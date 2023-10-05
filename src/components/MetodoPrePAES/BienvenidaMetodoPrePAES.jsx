import React from 'react';
import signodeinterrogacion from '../../images/sigoInterrogacion.png';
import flechaCorrecta from '../../images/flecha-correcta.png';
import pruebasbeta from '../../images/pruebas-beta.png';



const BienvenidaMetodoPrePAES = ({ onHide }) => {
    return(
        <div className='section_metodo_prepaes' >
            <div className='section_metodo_prepaes__title'>
                <h1>Método Pre<span className='text-warning '>PAES</span></h1>
            </div>
            <div className='section_metodo_prepaes__description'>
                <p>En esta sección, podrás practicar y entrenar tus habilidades. Las preguntas se irán <b>adaptando</b> a tus necesidades. <b>Es un buen lugar para cometer errores</b>; de hecho, esperamos que lo hagas. Te irás superando a medida que avances y practiques más. Confiamos en que lograrás mejorar tus resultados</p>
            </div>
            <div className='image-text-sections'>
            <div className='image-text-section'>
                <img src={signodeinterrogacion} alt='Imagen 1' className='image'/>
                <p>Algunas preguntas se repetirán; es parte del proceso.</p>
            </div>
            <div className='image-text-section'>
                <img src={flechaCorrecta} alt='Imagen 2' className='image'/>
                <p>Puedes continuar en cualquier momento; tu progreso se guarda constantemente.</p>
            </div>
            <div className='image-text-section'>
                <img src={pruebasbeta} alt='Imagen 3' className='image'/>
                <p>Nos sería de gran ayuda si pudieras notificar cualquier problema o sugerencia.</p>
            </div>
        </div>
            <div className='section_metodo_prepaes__start-button'>
                <button className='start_button' onClick={onHide}>Proximamente</button>
            </div>
            {/*<LineaProgreso />*/}
        </div>
    );
}
export default BienvenidaMetodoPrePAES;    