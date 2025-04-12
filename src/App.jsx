import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import Home from './pages/Home.jsx';
import BuscadorFichas from './pages/BuscadorFichas.jsx';
import { UserContext } from './context/UserContext.jsx';
import HomeAdmin from './pages/HomeAdmin.jsx';
import HomeUser from './pages/HomeUser.jsx';
import FormAltaAdmin from './pages/FormAltaAdmin.jsx';
import CitasAdmin from './pages/CitasAdmin.jsx';

import CalendarioAdmin from './components/CalendarioAdmin.jsx';
import { Navigate } from 'react-router-dom';
import Clientes from './pages/Clientes.jsx';

function App() {
  const { usuario, idUsuario, loading } = useContext(UserContext); // Usa el usuario del contexto
  useEffect(() => {
    console.log('Rol restaurado desde contexto:', usuario);
    console.log('ID restaurado desde contexto:', idUsuario);
  }, [usuario, idUsuario]);
  if(loading){
    return <div>Loading...</div>
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />     
      <Route path="/galeria" element={<HomeUser/>} />
      <Route path="/servicios" element={<HomeUser/>} />
      <Route path="/buscar" element={usuario === 'admin' ? <BuscadorFichas /> : <Navigate to="/home" replace/>} />
      <Route path="/adminhome" element={usuario === 'admin' ? <HomeAdmin/> : <Navigate to="/home" replace/>} />
      <Route path="/adminalta" element={usuario === 'admin' ? <FormAltaAdmin/> : <Navigate to="/home" replace/>} />
      <Route path="/clientes" element={usuario === 'admin' ? <Clientes/> : <Navigate to="/home" replace/>} />
      <Route path="/userhome" element={usuario === 'user' ? <HomeUser/> : <Navigate to="/home" replace/>} />
      <Route
        path="/admincitas"
        element={usuario === 'admin' ? <CitasAdmin /> : <Navigate to="/home" replace/>}


      />
    </Routes>
  );
}

export default App;
