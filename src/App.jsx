
import './styles/menuApp.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from './components/auth/Login';
import MenuUser from './components/menu/MenuUser';
import GetEssay from './components/essay/GetEssay';
import PaginacionHistorial from './components/progresoUsuario/historial/PaginacionHistorial';
import UserProfile from './components/Profile/UserProfile';
import CrearEnsayo from './components/createEssay/CrearEnsayo';
import GetEssayCustom from './components/essay/GetEssayCustom';
import GetEssayCustomTest from './components/essay/GetEssayCustomTest';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Ensayos" element={<MenuUser />} />
          <Route path="Ensayos/:tema/:id" element={<GetEssay />} />
          <Route path="Progreso" element={<PaginacionHistorial/>} />
          <Route path="Perfil" element={<UserProfile/>} />
          <Route path="CrearEnsayo" element={<CrearEnsayo/>} />
          <Route path="CrearEnsayo/:tema/:id" element={<GetEssayCustom/>} />
          <Route path="CrearEnsayoTest/:tema/:id" element={<GetEssayCustomTest/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
