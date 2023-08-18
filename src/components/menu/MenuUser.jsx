import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import CardEssay from '../CardEssay';
import CardEssayCustom from './CardEssayCustom';
import '../../styles/menuApp.css'

const MenuUser = () => {
    
    const [sidebarActive, setSidebarActive] = useState(JSON.parse(localStorage.getItem("sidebarActive"))||false);
 
    const toggleSidebar = () => {
        setSidebarActive(prevState => !prevState);
    };
    useEffect(() => {
        localStorage.setItem("sidebarActive", sidebarActive);
    }, [sidebarActive]);
    return (
        <>
            <Sidebar sidebarActive={sidebarActive} ubicacionActual={"Ensayos"}/>
            <div className="content">
            <Navbar toggleSidebar={toggleSidebar} />
            <main>
                <div className="header">
                <div className="left">
                    <h1>Ensayos Predeterminados</h1>
                </div>
                </div>
                <CardEssay />
                <div className="header" style={{marginTop:'3rem'}}>
                <div className="left">
                    <h1>Ensayos Personalizados</h1>
                    {/*<p style={{color:'white', margin:'1rem'}}>Aun no se Crean ensayos personalizados</p>*/}
                </div>
                </div>
                <CardEssayCustom />
            </main>
            </div>
      </>
    )
}
export default MenuUser        