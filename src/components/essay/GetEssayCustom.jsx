import React, { useState } from 'react';
import Essay from "./Essay";
import axios from 'axios';
import { useEffect } from 'react';
import { Apiurl } from "../../Services/apirest";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import '../../styles/menuApp.css'
import { useLocation } from 'react-router-dom';
const GetEssayCustom = () => {
    const location = useLocation();
    const tema = location.pathname.split('/')[2]; // Obtenemos el valor del tercer segmento de la URL
    const urlPost = Apiurl + `custom_essays/`;
    const ApiUrl = Apiurl + `questions_alternative/?subject=`;
    const [ensayoSelected, setensayoSelected] = useState(JSON.parse(localStorage.getItem('formData')).ensayoSelected);
    const [current_questions] = useState(JSON.parse(localStorage.getItem('formData')).cantidadPreguntas);
    const [post, setPost] = React.useState([]);
    const [nombreEnsayo] = React.useState("Ensayo Personalizado");
    const [iniciar, setIniciar] = React.useState(false);
    const [ensayosArray, setEnsayosArray] = React.useState([])
    const [sidebarActive, setSidebarActive] = useState(JSON.parse(localStorage.getItem("sidebarActive")) || false);

    const toggleSidebar = () => {
        setSidebarActive(prevState => !prevState);
    };
    useEffect(() => {
        localStorage.setItem("sidebarActive", sidebarActive);
    }, [sidebarActive]);

    function llamadoApi() {
        console.log(localStorage.getItem('formData'))
        const ensayosSeleccionados = [];
        const promesas = [];
        let checkBoxSeleccionados = 0;

        // recorremos el ensayoSelected
        for (let i in ensayoSelected) {
            // revisamos si el checkbox es true, con esto sabemos cual fue marcada y cual no.
            if (ensayoSelected[i].checked === true) {
                // inicializamos la la url agregando name al final que sera (numeros,geometria...)
                const token = localStorage.getItem("token");
                const ensayoUrl = `${ApiUrl}${ensayoSelected[i].name}`;
                checkBoxSeleccionados++;
                // almacenamos las promesas en un arreglo, el cual son los datos de la api, aun no cargados.
                //las promesas pueden tener tres estados: pendiente (pending), resuelta (fulfilled) y rechazada (rejected).
                promesas.push(axios.get(ensayoUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }));

            }
        }

        // si al menos tenemos un checkbox seleccionado que rellene el post y mande la informacion al ensayo.
        if (checkBoxSeleccionados > 0) {
            // esperamos a que todas las promesas se resuelvan y concatenamos los datos, para asi poder concadenar
            Promise.all(promesas)
                .then((responses) => {
                    for (let i = 0; i < responses.length; i++) {
                        // agregamos toda la informacion de la api.
                        ensayosSeleccionados.push(responses[i].data);
                    }
                    // concatenamos todos los datos del arreglo para que quede como 1 arreglo.
                    setPost([].concat(...ensayosSeleccionados));
                    setIniciar(true);
                })
                .catch((error) => {
                    console.log(error);

                });
        }
    }
    function filtrarArray(array) {
        const subjects = {}; // Objeto para contar las ocurrencias de cada tema
        let arrayFiltrada = []; // Array para almacenar los objetos filtrados
        const formData = JSON.parse(localStorage.getItem('formData'));
        const cantidadPreguntas = parseInt(formData.cantidadPreguntas);
        let ensayosSeleccionados = 0;
        for (let i in ensayoSelected) {
            if (ensayoSelected[i].checked === true) {
                ensayosSeleccionados++;
            }
        }

        const cantidadSubject = Math.round(cantidadPreguntas / ensayosSeleccionados);

        array.forEach(item => {
            const { subject } = item;
            subjects[subject] = (subjects[subject] || 0) + 1;// Incrementar el contador para el tema actual
            if (subjects[subject] <= cantidadSubject) {
                arrayFiltrada.push(item); // Agregar el objeto al array filtrado
            }
        });

        return shuffleArray(arrayFiltrada)
    }
    function shuffleArray(array) {


        const newArray = [...array];
        newArray.sort(() => Math.random() - 0.5);

        return newArray;
    }
    for (let i = 0; i < post.length; i++) {
        post[i].answer = shuffleArray(post[i].answer);
    }
    //setiamos los id de los ensayos
    useEffect(() => {
        const updatedEnsayosArray = [];
        for (let i in ensayoSelected) {
            if (ensayoSelected[i].checked === true)
                updatedEnsayosArray.push(ensayoSelected[i].id);
        }
        setEnsayosArray(updatedEnsayosArray);
    }, [ensayoSelected]);
    // enviamos los datos al backend
    useEffect(() => {

        if (ensayosArray.length > 0) {

            llamadoApi()

        }
    }, [ensayosArray]);

    return (
        <>
            <Sidebar sidebarActive={sidebarActive} ubicacionActual={"Ensayos"} />
            <div className="content">

                <Navbar toggleSidebar={toggleSidebar} />
                <main >
                    {!iniciar && (
                        <div className="shapeContainer" >


                            <div class="shapes-9"></div>
                            <h2>Generando Ensayo</h2>
                        </div>
                    )}
                    {iniciar && (
                        <Essay
                            ensayo={filtrarArray(post)}
                            titleEnsayo={nombreEnsayo}
                        />
                    )}
                </main>
            </div>
        </>
    );
}
export default GetEssayCustom;