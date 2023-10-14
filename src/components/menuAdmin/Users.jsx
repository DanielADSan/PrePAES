import React, { useState, useEffect } from 'react';
import SidebarAdmin from './SidebarAdmin'
import NavbarAdmin from './NavbarAdmin'
import '../../styles/menuApp.css'
import ChangeUsers from './ChangeUsers';//cambiar esto
import AddUsers from './AddUsers';//cambiar esto
import { motion } from "framer-motion"

const Users = () => {

    const [sidebarActive, setSidebarActive] = useState(JSON.parse(localStorage.getItem("sidebarActive")) || false);

    const toggleSidebar = () => {
        setSidebarActive(prevState => !prevState);
    };
    const [selectedButton, setSelectedButton] = useState('modificar');
    const handleButtonClick = (button) => {
        setSelectedButton(button);
    }
    useEffect(() => {
        localStorage.setItem("sidebarActive", sidebarActive);
    }, [sidebarActive]);
    return (
        <>
            <SidebarAdmin sidebarActive={sidebarActive} ubicacionActual={"Usuarios"} />
            <div className="content">
                <NavbarAdmin toggleSidebar={toggleSidebar} />
                <main>
                    <div className="header">
                        <div className="left">
                            <h1>Administrar Usuarios</h1>
                        </div>
                    </div>
                    <div className="container-enunciados">
                        <div className="toggle-button">
                            <motion.button
                                className={selectedButton === 'modificar' ? 'modificar active' : 'modificar'}
                                onClick={() => handleButtonClick('modificar')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                Modificar Usuarios
                            </motion.button>
                            <motion.button
                                className={selectedButton === 'añadir' ? 'añadir active' : 'añadir'}
                                onClick={() => handleButtonClick('añadir')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                Añadir Usuarios
                            </motion.button>
                            <motion.div
                                className="indicator"
                                layoutId="indicator"
                                initial={false}
                                animate={{ x: selectedButton === 'modificar' ? 0 : '50%' }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        </div>
                    </div>
                    {selectedButton === 'modificar' && (
                        <ChangeUsers />
                    )}
                    {selectedButton === 'añadir' && (
                        <AddUsers />
                    )}
                </main>
            </div>
        </>
    )
}
export default Users        