import React, { useEffect, useState, useRef } from 'react';
import LinesChart from './LinesChart';

const Estadisticas = ({items}) => {
       
        return (
                <div className="contenedorPrincipalEstadisticas">
                        <div className="contenedorEstadisticas">
                                

                                <div className="contenedorGrafico">
                                        <LinesChart items={items} />
                                </div>
                        </div>
                </div>


        );
};
export default Estadisticas;