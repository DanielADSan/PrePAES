import React from "react";
import frases from "./frasesMotivation";

function TipsPAES() {
    const numeroAleatorio = Math.floor(Math.random() * frases.length) ;
    return(
    <div className="motivation-container"style={{marginTop:'1rem !important'}} >
        <p className="motivation-text" >"{frases[numeroAleatorio]}"</p>
    </div>
    )
}

export default TipsPAES;
