import React from "react";
import avatar from '../../images/avataaars2.png'
import user from '../../images/user.png'

const NavbarAdmin = ({ toggleSidebar }) => {
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
          <div class="profile">
                    <div className="infoo">
                        <p>Hola, <b>{localStorage.getItem('username')}</b></p>
                        <small className="text-muted">Administrador</small>
                    </div>
                    <div class="profile-photo">
                        <img src={avatar}/>
                    </div>
                </div>
    
        </nav>
    );
}
export default NavbarAdmin;