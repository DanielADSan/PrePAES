import React from 'react';
import LinesChart from './LinesChart';
import GraficoBarras from './GraficoDeBarras';
import { useState } from 'react';

const Estadisticas = () => {
    const [chartType, setChartType] = useState('LineChart');
            return (
                <div className='contenedorPrincipalEstadisticas'>
                    <div className='contenedorEstadisticas '>
                        <select className='form-select mb-3  ' value={chartType} onChange={(e) => setChartType(e.target.value)}>
                        <option value="LineChart">Puntaje evolutivo</option>
                        <option value="GraficoBarras">Promedio de Puntajes</option>
                        
                        </select>
                        {chartType === 'LineChart' ? <LinesChart /> : chartType === 'GraficoBarras' ? <GraficoBarras /> : <GraficoBarras />}
                    </div>
                </div>
            );
};
export default Estadisticas;