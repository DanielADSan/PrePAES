import React, { useEffect, useState } from "react";
import avatar from '../images/avataaars2.png'
import user from '../images/user.png'
import {Apiurl} from '../Services/apirest'
import axios from "axios";
const Navbar = ({ toggleSidebar }) => {
    const handleMenuClick = () => {
        toggleSidebar(prevState => !prevState);
      };
      const urlGetDataUser = Apiurl + 'api/profile/';
      const [avatar, setAvatar] = useState(null);
      useEffect(() => {
        const token = localStorage.getItem('token');
        const url = Apiurl + 'user/';
        const getUser = async () => {
          const res = await axios.get(urlGetDataUser, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res.data);
          setAvatar(res.data.avatar);
        };
        getUser();
      }, []);
    
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
                        {avatar == null ? <img src={user} alt="Avatar" /> : <img src={avatar} alt="Avatar" />  }
                    </div>
                </div>
    
        </nav>
    );
    }
export default Navbar;