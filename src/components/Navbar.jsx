import React from "react";
import avatar from '../images/avataaars2.png'
import user from '../images/user.png'

const Navbar = ({ toggleSidebar }) => {
    const handleMenuClick = () => {
        toggleSidebar(prevState => !prevState);
      };
    
    return (
        <nav>
          <i className='bx bx-menu' onClick={handleMenuClick}></i>
          <form action="#">
            <div className="form-input">
              
            </div>
          </form>
          <input type="checkbox" id="theme-toggle" hidden />
          <label htmlFor="theme-toggle" className="theme-toggle"></label>
          {/*<a href="#" className="notif">
            <i className='bx bx-bell'></i>
            <span className="count">2</span>
          </a>*/}
          <div className="profile">
                    <div className="infoo">
                        <p>Hola, <b>{localStorage.getItem('username')}</b></p>
                        <small className="text-muted">Estudiante</small>
                    </div>
                    <div className="profile-photo">
                        <img src={user}/>
                    </div>
                </div>
    
        </nav>
    );
    }
export default Navbar;