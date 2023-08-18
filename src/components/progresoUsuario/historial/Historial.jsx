import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import VerDatosHistorial from './VerDatosHistorial';
import { useLocation, useParams } from 'react-router-dom';

const Historial = ({items}) => {
    const [search, setSearch] = React.useState('');
    const [selectFiltro, setSelectFiltro] = React.useState('4');
    const [paginaActual, setPaginaActual] = React.useState(0);
    const [filtrarPor, setFiltrarPor] = React.useState(true);
    const [focusFiltrar, setFocusFiltrar] = React.useState(false)
    const itemsPorPagina = 5;
    const [idVermas, setIdVerMas] = React.useState({})
    const [verMasConfirmado, setVerMasConfirmado] = React.useState(false);
    const location = useLocation();
    const params = useParams();

    const { action } = params; // Get the value of the "action" parameter from the URL

    const verMas = (id, name, puntaje, date, cantidadPreguntas) => {
      
        setIdVerMas(
            {
                id: id,
                nombre: name,
                puntaje: puntaje,
                date: date,
                cantidadPreguntas: cantidadPreguntas
            }
        )

        setVerMasConfirmado(true);
    }
    // funcion que busca por nombre y envia los datos al historial filtrados por nombre.
    const BusquedaNombre = () => {
        // si no han ingresado una busqueda, enviamos la lista completa.
        if (!search) {
            const datosHistorial = items;
            const indexInicio = paginaActual * itemsPorPagina
            // setBusquedaVacia(false)
            if (selectFiltro) {
                FiltroSelect(datosHistorial);
            }
            return datosHistorial.slice(indexInicio, indexInicio + itemsPorPagina)
        }
        // creamos una variable y pasamos la busqueda a minusculas
        const minusculas = search.toLowerCase();

        const filtrado = items.filter(ensayo =>
            ensayo.name.toLowerCase().includes(minusculas)
        )

        if (selectFiltro) {
            FiltroSelect(filtrado);
        }
        // setBusquedaVacia(false);

        const indexInicio = paginaActual * itemsPorPagina;
        const itemsPagina = filtrado.slice(indexInicio, indexInicio + itemsPorPagina);

        return itemsPagina;
    }
    const FiltroSelect = (ensayo) => {

        // const filtradoSinTilde = ensayo.map(ensayo => ({
        //     ...ensayo,
        //     name:removeAccents(ensayo.name)
        // })) 
        // ordena nombre ascendentemente.

        // ordena puntaje de menor a mayor
        if (selectFiltro === '2') {
            return ensayo = ensayo.sort((a, b) => a.puntaje - b.puntaje);
        }
        // ordena puntaje de mayor a menor
        else if (selectFiltro === '3') {
            return ensayo = ensayo.sort((a, b) => b.puntaje - a.puntaje);
        }
        //ordena fecha ascendentemente
        else if (selectFiltro === '4') {
            return ensayo = ensayo.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
        }
        //ordena fecha descedentemente
        else if (selectFiltro === '5') {
            return ensayo = ensayo.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
        }
        // ordena las preguntas de menor a mayor
        else if (selectFiltro === '6') {
            return ensayo = ensayo.sort((a, b) => a.current_questions - b.current_questions);
        }
        // ordena preguntas de mayor a menor.
        else if (selectFiltro === '7') {
            return ensayo = ensayo.sort((a, b) => b.current_questions - a.current_questions);
        }
    }
    //funcion que envia el tamaño de la busqueda ingresada.
    const largoBusqueda = () => {
        if (!search) return items.length

        const minusculas = search.toLocaleLowerCase();
        const filtrado = items.filter(ensayo => ensayo.name.toLowerCase().includes(minusculas))
        return filtrado.length;
    }

    //guardamos el valor del search que pone el usuario.
    const onSearchChange = ({ target }) => {
        setSearch(target.value);
        //cada vez que haya una busqueda se ira automaticamente a la primera pagina.
        setPaginaActual(0);
    };

    // guardamos valor del filtro select.
    const onSelectChange = ({ target }) => {
        setSelectFiltro(target.value);
        if (target.value != '') {
            setFiltrarPor(false)
        } else {
            setFiltrarPor(true)
        }
    }

    const handleFocus = () => {
        setFocusFiltrar(true)
    }

    //funcion para avanzar de pagina.
    const nextPage = () => {
        const totalPaginas = largoBusqueda();
        if ((paginaActual + 1) * itemsPorPagina < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
    }

    // funcion para retroceder de pagina.
    const previousPage = () => {
        if (paginaActual > 0) {
            setPaginaActual(paginaActual - 1);
        }
    }

    // console.log(busquedaVacia)
    if (verMasConfirmado) {
        return (
            <div>
                <main className="contenedor-principal min-vh-100">
                    <VerDatosHistorial datosEnsayo={idVermas} setVerMasConfirmado ={setVerMasConfirmado} >
                    </VerDatosHistorial>
                    
                </main>
            </div>
        )
    }
    return (
        <>
            <div className='contenedorPrincipal'>

                <div className='contenedorNav'>

                    <div className='busqueda'>
                        <input
                            className="form-control busqueda me-2"
                            type="search" placeholder="Buscar Ensayo"
                            aria-label="Search"
                            onChange={onSearchChange}
                        >
                        </input>
                        {BusquedaNombre().length === 0 && items.length > 0 && (
                            <p className="invalid-feedback d-block fallida">
                                No se encontro ningun resultado!
                            </p>)}
                    </div>


                    <select
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example"
                        onChange={onSelectChange}
                        onFocus={handleFocus}
                        defaultValue=""
                    >
                        {filtrarPor && !focusFiltrar && <option value="" >Filtrar por:</option>}
                        <option className='optionFilter' value="2">Puntaje de menor a mayor</option>
                        <option className='optionFilter' value="3">Puntaje de mayor a menor</option>
                        <option className='optionFilter' value="4">Fechas mas recientes</option>
                        <option className='optionFilter' value="5">Fechas mas antiguas</option>
                        <option className='optionFilter' value="6">Preguntas de menor a mayor</option>
                        <option className='optionFilter' value="7">Preguntas de mayor a menor</option>
                    </select>
                </div>
                <div className='contenedorHistorial'>
                    {/* <h2>Historial</h2> */}
                    <div className='label'>
                        <h5>Nombre</h5>
                        <h5>Puntaje</h5>
                        <h5>Personalizado</h5>
                        <h5>Fecha</h5>

                        <h5>N° preguntas</h5>
                        <h5>Acciones</h5>
                    </div>

                    {BusquedaNombre().map((ensayo, index) => (
                        <div className='info' key={index}>
                            <div className='list-info'>{ensayo.name}</div>
                            <div className='list-info'>{ensayo.puntaje}</div>
                            <div className='list-info'>{ensayo.is_custom ? 'Si' : 'No'}</div>
                            <div className='list-info'>{ensayo.date}</div>

                            <div className='list-info'>{ensayo.current_questions}</div>
                            <div className='list-info' onClick={() => verMas(ensayo.id, ensayo.name, ensayo.puntaje, ensayo.date, ensayo.current_questions)} >
                                <button className='btn-accion'> <SearchIcon></SearchIcon>
                                    </button>
                           
                            </div>
                        </div>))
                    }

                </div>

                <div className='Botones'>
                    <ul className="pagination">
                        <li onClick={previousPage} className="page-item"><a className="page-link" href="#">Retroceder</a></li>
                        <li className="page-item"><a className="page-link" href="#">{paginaActual + 1}</a></li>
                        <li onClick={nextPage} className="page-item"><a className="page-link" href="#">Avanzar</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Historial;    