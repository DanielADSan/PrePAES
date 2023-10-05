import React from 'react';
import { useState, useEffect } from "react";
import FaseEnsayo from './FaseEnsayo';
import BienvenidaMetodoPrePAES from './BienvenidaMetodoPrePAES';
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import '../../styles/menuApp.css'

const MetodoPrePAES = () => {
    const [sidebarActive, setSidebarActive] = useState(JSON.parse(localStorage.getItem("sidebarActive")) || false);

    const toggleSidebar = () => {
        setSidebarActive(prevState => !prevState);
    };
    useEffect(() => {
        localStorage.setItem("sidebarActive", sidebarActive);
    }, [sidebarActive]);
    const [showBienvenida, setShowBienvenida] = useState(JSON.parse(localStorage.getItem("showBienvenida")) || true);
    useEffect(() => {
        setShowBienvenida(JSON.parse(localStorage.getItem("showBienvenida")))
    }, [showBienvenida]);
    const hideBienvenida = () => {
        localStorage.setItem("showBienvenida", false);
        setShowBienvenida(false);
    };
    return (
        <>
            <Sidebar sidebarActive={sidebarActive} ubicacionActual={"MetodoPrePAES"} />
            <div className="content">
                <Navbar toggleSidebar={toggleSidebar} />
                <main>
                    {showBienvenida && <BienvenidaMetodoPrePAES onHide={hideBienvenida} />}
                    {!showBienvenida && <FaseEnsayo />}
                </main>
            </div>
        </>
    );
}
export default MetodoPrePAES;    