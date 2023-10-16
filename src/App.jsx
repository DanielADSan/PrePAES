
import './styles/menuApp.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import MenuUser from './components/menu/MenuUser';
import GetEssay from './components/essay/GetEssay';
import PaginacionHistorial from './components/progresoUsuario/historial/PaginacionHistorial';
import UserProfile from './components/Profile/UserProfile';
import CrearEnsayo from './components/createEssay/CrearEnsayo';
import GetEssayCustom from './components/essay/GetEssayCustom';
import GetEssayCustomTest from './components/essay/GetEssayCustomTest';
import Questions from './components/menuAdmin/Questions';
import Users from './components/menuAdmin/Users'
import MetodoPrePAES from './components/MetodoPrePAES/MetodoPrePAES';
import PreguntaPrePAES from './components/MetodoPrePAES/PreguntaPrePAES';
import ResumenPrePAES from './components/MetodoPrePAES/ResumenPrePAES';
import PuntajeDeCorte from './components/puntaje-de-corte/PuntajeDeCorte';
import Reset from './components/auth/ResetPassword';
import ChangePassword from './components/auth/ChangePassword';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Ensayos" element={<MenuUser />} />
          <Route path="Ensayos/:tema/:id" element={<GetEssay />} />
          <Route path="Progreso" element={<PaginacionHistorial/>} />
          <Route path="Perfil" element={<UserProfile/>} />
          <Route path="CrearEnsayo" element={<CrearEnsayo/>} />
          <Route path="CrearEnsayo/:tema/:id" element={<GetEssayCustom/>} />
          <Route path="CrearEnsayoTest/:tema/:id" element={<GetEssayCustomTest/>} />
          <Route path="Preguntas" element={<Questions/>} />
          <Route path="Usuarios" element={<Users/>} />
          <Route path="MetodoPrePAES" element={<MetodoPrePAES/>} />
          <Route path="PreguntaPrePAES" element={<PreguntaPrePAES/>} />
          <Route path="ResumenPrePAES" element={<ResumenPrePAES/>} />
          <Route path="PuntajeDeCorte" element={<PuntajeDeCorte/>} />
          <Route path="Register" element={<Register />} />
          <Route path="Reset" element={<Reset />} />
          <Route path="Reset/Password/:uid/:token/" element={<ChangePassword />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
